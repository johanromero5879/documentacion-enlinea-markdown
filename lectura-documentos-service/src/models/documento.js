import { ObjectId } from "mongodb"
import MongoDB from "./database"
const conn = new MongoDB()
const collectionName = "documentos"

export const getByID = async (id) => {
    try{
        await conn.connect()
        const fields = { projection: { historial_cambios: 0 } } 
        const query = { _id: ObjectId(id) }
        return await conn.db.collection(collectionName).findOne(query, fields)

    }catch(ex){
        throw ex
    }finally{
        conn.disconnect()
    }
}
