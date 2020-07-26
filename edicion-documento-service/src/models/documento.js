import { ObjectId } from "mongodb"
import MongoDB from "./database"
const conn = new MongoDB()
const collectionName = "documentos"

const addChangeToHistory = async (id) => {
    try{
        const filter = { _id: ObjectId(id) }
        const document = await conn.db.collection(collectionName).findOne(filter)
        if(!document)
            throw { code: 404, errors: ["El documento no existe"] }

        const { documento, fecha_modificacion, modificado_por } = document
        const cambio = {
            documento, 
            fecha: fecha_modificacion,
            fecha_server: new Date(),
            autor_cambio: modificado_por,
        }

        const update = {
            $push: { historial_cambios: cambio }
        }

        await conn.db.collection(collectionName).findOneAndUpdate(filter, update)
    }catch(ex){
        throw ex
    }
}

export const updateOneDoc = async (id, document) => {
    try{
        await conn.connect()
        await addChangeToHistory(id)

        const filter = { _id: ObjectId(id) }
        const update = { $set: document }

        await conn.db.collection(collectionName).findOneAndUpdate(filter, update)
    }catch(ex){
        throw ex
    }finally{
        conn.disconnect()
    }
}
