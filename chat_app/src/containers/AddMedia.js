import React, { Component } from 'react'

import { 
    View,
    Text,
    Image,
    Animated,
    Platform,
    Dimensions,
    ImageStore,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'
import ImagePicker from 'react-native-image-crop-picker';
import TxtInput from '../components/TxtInput'
import Btn from '../components/UI/Btn'
import { server } from '../config'

class AddMedia extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            screenHeight: Dimensions.get('window').height,
            taggedUsers: [],
            slidein: new Animated.Value(-Math.abs(Dimensions.get('window').height - 20)),  // Initial value for opacity: 0
            opacity: new Animated.Value(0),
            cycleCompleted: true
        }
    }

    openCamera = () => {
        ImagePicker.openCamera({
            width: 900,
            height: 600,
            cropping: true
        }).then(image => {
            this.setState({
                image
            }, () => {
                this.openImageMetaWindow(image)
            })
        }).catch(e => {
            console.log(e)
        })
    }

    openLibrary = () => {
        ImagePicker.openPicker({
            width: 900,
            height: 600,
            cropping: true
          }).then(image => {
              this.setState({
                  image
              }, () => {
                  this.openImageMetaWindow()
              })
          }).catch(e => {
            console.log(e)
        })
    }

    openImageMetaWindow = () => {
        if(this.state.cycleCompleted){
            this.setState({cycleCompleted: false}, 
              ()=>{
                Animated.timing(                  // Animate over time
                  this.state.slidein,            // The animated value to drive
                  {
                    toValue: 0,                   // Animate to opacity: 1 (opaque)
                    duration: 500,              // Make it take a while
                  }
                ).start()
                Animated.timing(                  // Animate over time
                  this.state.opacity,            // The animated value to drive
                  {
                    toValue: 1,                   // Animate to opacity: 1 (opaque)
                    duration: 700,              // Make it take a while
                  }
                ).start()
                setTimeout(()=>{
                  this.setState({cycleCompleted: true})
                }, this.props.timer || 700)
            })
        }
    }

    saveImageWithMeta = () => {
        const data = new FormData()
        
        data.append('user_id', this.props.redux.user._id) // you can append anyone.
        data.append('is_profile', true)
        data.append('is_banner', false)
        
        data.append('title', this.state.image_title)
        data.append('desc', this.state.image_description)
        data.append('tags', this.state.tag_user)
        
        data.append('file', {
            uri: this.state.image.path,
            type: 'image/jpeg', // or photo.type
            name: this.props.redux.user._id
        })
  
        fetch(`${server}/api/image`, {
            method: 'post',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': `JWT ${this.props.redux.user.token}`
            },
            body: data
        }).then(res => res.json())
        .then(response => {
            console.log('response -> ', response)

            ImageStore.removeImageForTag(this.state.image.path)
            this.setState({image: null})
        })
    }

    closeImageMetaWindow = (isProfile) => {
        this.setState({cycleCompleted: false}, 
            ()=>{
            Animated.timing(                  // Animate over time
                this.state.slidein,            // The animated value to drive
                {
                toValue: -Math.abs(Dimensions.get('window').height - 20),                   // Animate to opacity: 1 (opaque)
                duration: 500,              // Make it take a while
                }
            ).start()
            Animated.timing(                  // Animate over time
                this.state.opacity,            // The animated value to drive
                {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 700,              // Make it take a while
                }
            ).start()
            setTimeout(()=>{
                this.setState({cycleCompleted: true})
                this.saveImageWithMeta()
            }, this.props.timer || 700)
        })
    }

    handleMetaChange = ({prop, val}) => {
        this.setState({[prop]: val})
    }

    handleTagUser = (user) => {
        let taggedUsers = [...this.state.taggedUsers, user]
        this.setState({taggedUsers})
    }
    render() {
        return (
            <View style={styles.sections}>
                <TouchableOpacity style={styles.buttons} onPress={this.openCamera}>
                    <Icon name="camera" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Camera
                    </Text>
                </TouchableOpacity>
                <View style={styles.divider}/>
                <TouchableOpacity style={styles.buttons} onPress={this.openLibrary}>
                    <Icon name="image" style={{alignSelf: 'center', fontSize: 60}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>
                        Library
                    </Text>
                </TouchableOpacity>
                <Animated.View style={[{
                    bottom: this.state.slidein,
                    opacity: this.state.opacity
                }, styles.flyup]}>
                        {
                        this.state.image &&    
                            <Image
                                style={{height: 200, maxWidth: 300, width: '100%'}}
                                source={{uri: this.state.image.path}}
                            />
                        }
                    <TxtInput
                        id="image_title"
                        placeholder={'Title'}
                        placeholderTextColor={'rgba(0, 0, 0, 0.8)'}
                        onChange={this.handleMetaChange}
                        value={this.state.title}
                        styles={styles.input}
                    />
                    <TxtInput
                        styles={styles.input}
                        id="image_description"
                        placeholder={'Description'}
                        placeholderTextColor={'rgba(0, 0, 0, 0.8)'}
                        onChange={this.handleMetaChange}
                        value={this.state.title}
                    />
                    <TxtInput
                        styles={styles.input}
                        id="tag_user"
                        placeholder={'Tag User'}
                        placeholderTextColor={'rgba(0, 0, 0, 0.8)'}
                        onChange={this.handleMetaChange}
                        value={this.state.title}
                    />
                    {
                        this.state.taggedUsers.map(user => (
                            <Text>user</Text>
                        ))
                    }
                    <Btn
                        text="SAVE"
                        onPress={this.closeImageMetaWindow} 
                        style={styles.btn}
                    />
                </Animated.View>
            </View>
        )
    }
}

function mapStateToProps(redux) {
    return {
        redux
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMedia)

const isIphoneX = () => {
    let d = Dimensions.get('window');
    const { height, width } = d;
  
    return (
      // This has to be iOS duh
      Platform.OS === 'ios' &&
  
      // Accounting for the height in either orientation
      (height === 812 || width === 812)
    );
}


const styles = StyleSheet.create({
    sections: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: '90%',
        height: 2,
        backgroundColor: '#eee'
    },
    flyup: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: isIphoneX() ? Dimensions.get('window').height - 83 : Dimensions.get('window').height - 49,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 40
    },
    input: {
        marginBottom: 10,
        paddingLeft: 0,
        borderWidth: 0,
        borderBottomWidth: 1
    },
    btn: {
        alignSelf: 'center'
    }
})