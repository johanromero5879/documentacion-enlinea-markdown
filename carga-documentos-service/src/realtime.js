import socket from "socket.io"

export default (server) => {
    const io = socket(server)

    io.on("connection", (socket) => {
        socket.on("document:new", (message) => {
            socket.broadcast.emit("document:new", message)
        })
    })

}