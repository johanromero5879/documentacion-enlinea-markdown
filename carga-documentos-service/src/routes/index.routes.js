import { Router } from "express"
import { insertarDocumento } from "../controllers/documentos.controller"

const router = Router()

router.use(async (req, res, next) => {
    try{
        if(!req.session || !req.session._id) 
            throw { code: 401, /*Unauthorized*/ errors: ["Acceso denegado"] }

        next()
        
    }catch(ex){
        if(ex.code){
            res.status(ex.code).json(ex)
        }else{
            console.error(ex)
        }
    }
})

router.post("/", async (req, res) => {
    try{
        const { usuario, nombre } = req.session
        const { titulo, documento, fecha_creacion, fecha_modificacion } = req.body
        const newDocument = {
            autor: { usuario, nombre },
            modificado_por: { usuario, nombre },
            titulo, documento, 
            fecha_creacion: new Date(fecha_creacion), 
            fecha_modificacion: new Date(fecha_modificacion),
            historial_cambios: []
        }
        
        const inserted_document = await insertarDocumento(newDocument)

        res.json({ 
            success: true,
            documento: inserted_document
        })

    }catch(ex){
        if(ex.code){
            res.status(ex.code).json(ex)
        }else{
            console.error(ex)
        }
    }
})

export default (app) => {
    app.use("/document", router)
}