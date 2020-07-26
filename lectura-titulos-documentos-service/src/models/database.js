import { MongoClient } from "mongodb"

const url = "mongodb://localhost:27017"

const dbName = "markdownDB"

export default class MongoDB{
    constructor(){
        this.client = null
        this.db = null
    }

    async connect(){
        try{
            this.client = await MongoClient.connect(url, { useUnifiedTopology: true })
            this.db = this.client.db(dbName)
        }catch(ex){
            throw "Error al conectar a la BD"
        }
    }

    disconnect(){
        if(this.client != null){
            this.client.close()
        }
    }
}