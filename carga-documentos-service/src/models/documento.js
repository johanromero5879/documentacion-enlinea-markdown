import MongoDB from "./database"
const conn = new MongoDB()
const collectionName = "documentos"

export const insertOneDoc = async (document) => {
    try{
        await conn.connect() 
        return await (await conn.db.collection(collectionName).insertOne(document)).ops[0]
    }catch(ex){
        throw ex
    }finally{
        conn.disconnect()
    }
}
