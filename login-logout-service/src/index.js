import app from "./server"

const run = async () => {
    await app.listen(app.get("port"))
    console.log(`Servicio login-logout conectado al puerto ${app.get("port")}`)
}

try{
    run()
}catch(ex){
    console.error(ex.message)
}