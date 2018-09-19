var express = require('express');
var router = express.Router();
var expressWs = require('express-ws')(router);

router.ws('/', function(ws, req) {
    console.log('inside the socket!')
    ws.on('message', function(msg) {
        console.log('inside the socket! 2', {expressWs: expressWs.getWss().clients})
        // ws.send(msg);
    });
});
 
export default router
