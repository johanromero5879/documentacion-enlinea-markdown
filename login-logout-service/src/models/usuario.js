import MongoDB from "./database"
const conn = new MongoDB()
const collectionName = "usuarios"

export const getUsuario = async (nombre_usuario) => {
    try{
        await conn.connect()
        return await conn.db.collection(collectionName).findOne({ usuario: nombre_usuario })
    }catch(ex){
        throw ex
    }finally{
        conn.disconnect()
    }
}

export const setUltimoInicioSesion = async (id_usuario) => {
    try{
        await conn.connect()
        const filter = { _id: id_usuario }
        const update = { $set: { ultimo_inicio_sesion: new Date() } }
        await conn.db.collection(collectionName).findOneAndUpdate(filter, update)
    }catch(ex){
        throw ex
    }finally{
        conn.disconnect()
    }
}