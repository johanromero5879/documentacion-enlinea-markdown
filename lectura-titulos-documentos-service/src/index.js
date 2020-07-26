import app from "./server"

const run = async () => {
    await app.listen(app.get("port"))
    console.log(`Servicio lectura-titulos-documentos conectado al puerto ${app.get("port")}`)
}

try{
    run()
}catch(ex){
    console.error(ex.message)
}