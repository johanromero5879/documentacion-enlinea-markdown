import MongoDB from "./database"
const conn = new MongoDB()
const collectionName = "documentos"

export const getUltimosTitulos = async (limit) => {
    try{
        await conn.connect()
        const fields = { projection: { _id: 1, titulo: 1 } } 
        return await conn.db.collection(collectionName)
            .find({}, fields).sort({ fecha_creacion: -1 }).limit(parseInt(limit)).toArray()
    }catch(ex){
        throw ex
    }finally{
        conn.disconnect()
    }
}

export const getDocumentosPorTitulo = async (search, limit) => {
    try{
        await conn.connect()

        const query = { titulo: new RegExp(search, "i") }
        const fields = { projection: { _id: 1, titulo: 1 } } 

        return await conn.db.collection(collectionName)
            .find(query, fields).sort({ titulo: -1 }).limit(parseInt(limit)).toArray()
    }catch(ex){
        throw ex
    }finally{
        conn.disconnect()
    }
}
