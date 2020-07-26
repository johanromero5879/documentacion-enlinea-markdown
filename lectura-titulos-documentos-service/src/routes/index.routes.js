import { Router } from "express"
import { consultarUltimosTitulos, consultarDocumentosPorTitulo } from "../controllers/documentos.controller"

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

router.get("/last", async (req, res) => {
    const limit = req.query.limit || 5
    try{
        const documentos = await consultarUltimosTitulos(limit)
        res.json({
            success: true,
            documentos
        })

    }catch(ex){
        if(ex.code){
            res.status(ex.code).json(ex)
        }else{
            console.error(ex)
        }
    }
})

router.get("/:title", async (req, res) => {
    const limit = req.query.limit || 5
    try{
        const documentos = await consultarDocumentosPorTitulo(req.params.title, limit)
        res.json({
            success: true,
            documentos
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
    app.use("/document/title/", router)
}