import socket from "socket.io"

export default (server) => {
    const io = socket(server)

    io.on("connection", (socket) => {
        socket.on("document:edit", (message) => {
            socket.broadcast.emit("document:edit", message)
        })
    })

}