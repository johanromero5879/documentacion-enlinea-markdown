import { Router } from "express"
import { consultarPorID } from "../controllers/documentos.controller"

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

router.get("/:id", async (req, res) => {
    try{
        const documento = await consultarPorID(req.params.id)
        res.json({
            success: true,
            documento
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