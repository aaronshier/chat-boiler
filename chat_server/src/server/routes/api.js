'use strict'

import express from 'express'
import passport from 'passport'
import User from '../models/user'

import { status_codes } from '../../config'
const mongoose = require('mongoose')
const busboyBodyParser = require('busboy-body-parser')
const Jimp = require("jimp");
let Grid = require("gridfs-stream")
	  Grid.mongo = mongoose.mongo

let conn = mongoose.connection
let gfs

let router = express.Router()

router.post('/signup', passport.authenticate('local-signup', 
  {   successRedirect: '/',
    failureRedirect: '/signup?error=true&message=That+email+is+already+taken.++Try again' 
}))

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login?error=true&message=Your+email/password+was+incorrect!'
}))


router.post('/check-username', async (req, res) => {
  const username = req.body.username.toLowerCase().replace((/  |\r\n|\n|\r/gm),"")
  
  const nameTaken = await User.findOne({
    username
  })

  console.log({'check-username': username})
  
  console.log({nameTaken: nameTaken ? false : true})

  res.json({status: 200, username, nameAvailable: nameTaken ? false : true })
})

router.post('/update-user',  passport.authenticate('jwt', { session: false}), async (req, res) => {
  
  const username = req.body.username.toLowerCase().replace((/  |\r\n|\n|\r/gm),"");
  const uid = req.user._id
  
  const nameTaken = await User.findOne({
    username
  })
  
  if(!nameTaken){
    let user = await User.findOne({_id: uid})
    user.username = username
    const userUpdated = await User.update({_id: req.user._id}, user)
    res.json({status: status_codes.OK, username, update: userUpdated })
  } else {
    res.json({status: status_codes.RESOURCE_ALREADY_EXISTS, message: `The username "${username}" is already taken`})
  }

})


//FILE STORAGE API STUFF
conn.once("open", () => {
  let allFiles = conn.db.collection('fs.files')
  gfs = Grid(conn.db)

  router.use(busboyBodyParser({ limit: '10mb'})) 

  router.get('/images/:imgname', (req, res) => {
      let imgname = req.params.imgname
      let size = req.query.size

      gfs.files.find({
        filename: imgname
      }).toArray((err, files) => {

      if (files.length === 0) {
        return res.status(404).send({
            message: 'File not found'
        })
      }
      
      let data = []
      
      let readstream = gfs.createReadStream({
        filename: files[0].filename
      })

      readstream.on('data', (chunk) => {
        data.push(chunk)
      })

      readstream.on('end', async () => {
        
        data = Buffer.concat(data)
        
        if(size){
          
          size = parseInt(size)
          console.log({data: data.length})
          
          Jimp.read(data, (err, image) => {
            
            image.resize( size, size, Jimp.RESIZE_BEZIER)
            .getBuffer(Jimp.MIME_PNG, (err, msg) => {
              if(err) console.log({err})
              res.end(msg)
            })
            
          })
          
        } else {
          
          let img = Buffer(data)
          return res.end(img)
          
        }
        
      })

      readstream.on('error', (err) => {
        // if theres an error, respond with a status of 500
        // responds should be sent, otherwise the users will be kept waiting
        // until Connection Time out
        res.status(500).send(err)
        console.log('An error occurred!', err)
      })

    })
  })

  router.post('/image', passport.authenticate('jwt', { session: false}), async(req, res) => {
    
    let part = req.files.file
    
    let isProfile = req.body.is_profile
    let isBanner = req.body.is_banner
    let userID = req.body.user_id

    var newID = mongoose.Types.ObjectId()
    
    const user_id = req.user._id.toString()
    const lastFourOfUserID = user_id.substring(user_id.length - 4)
    
    let imageMeta = {
      url: `api/mobile/images/img_${newID}_${lastFourOfUserID}`,
      is_profile: isProfile,
      is_banner: isBanner,
      is_library: false,
      title: req.body.title,
      description: req.body.desc,
      users_tagged: req.body.tags,
      user_id: userID
    }
    console.log(req.body)

    // if(isProfile === "true"){
    //   console.log('isProfile happening -> ', isProfile)
    //   allFiles.findOne({
    //     'metadata.user_id' : req.user._id.toString(),
    //     'metadata.is_profile': 'true'
    //   }, (err, image) => {
    //     if(image){
    //       allFiles.update({_id: image._id}, { $set: {'metadata.is_profile': false, 'metadata.is_library': true }})
    //     }
    //   })
    // }
        
    // if(isBanner === "true"){
    //   console.log('isBanner happening -> ', isBanner)
    //   allFiles.findOne({
    //     'metadata.user_id' : req.user._id.toString(),
    //     'metadata.is_banner': 'true'
    //   }, (err, image) => {
    //     if(image){
    //       allFiles.update({_id: image._id}, { $set: {'metadata.is_banner': false, 'metadata.is_library': true }})
    //     }
    //   })
    // }

    const writeStream = gfs.createWriteStream({
        filename: `img_${newID}_${lastFourOfUserID}`,
        mode: 'w',
        content_type: part.mimetype,
        metadata: imageMeta
    })

    writeStream.on('close', async (file) => {
      // checking for file
      if(!file) {
            res.status(400).send('No file received')
      }
      return res.status(200).send({
          message: 'Upload was a success!',
          file: file,
      })
    })

    // using callbacks is important !
    // writeStream should end the operation once all data is written to the DB 
    writeStream.write(part.data, () => {
      writeStream.end()
    })  
  })
})



module.exports = router

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next()
  else
    res.json({signin: false})
}

function userStatus(req, res, next) {
  if (req.isAuthenticated())
      return true
  else 
      return false
}
