import { Router } from "express"
import { editarDocumento } from "../controllers/documentos.controller"

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

router.put("/:id", async (req, res) => {
    try{
        const { id } = req.params
        const { usuario, nombre } = req.session
        const { titulo, documento, fecha_modificacion } = req.body
        const document = {
            modificado_por: { usuario, nombre },
            titulo, documento, 
            fecha_modificacion: new Date(fecha_modificacion)
        }
        
        await editarDocumento(id, document)

        res.json({ success: true })

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