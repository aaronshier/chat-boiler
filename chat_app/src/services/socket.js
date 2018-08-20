export class Socket {
    constructor(server){
        console.log()
        this.socket = new WebSocket(server);
    }

}