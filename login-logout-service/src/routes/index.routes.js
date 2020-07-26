import { Router } from "express"
import { login } from "../controllers/login.controller"

const router = Router()

router.post("/login", async (req, res) => {
    try{
        const { _id, usuario, nombre, tipo, maximo_tiempo_sesion_inactiva } = await login(req.body)

        req.session._id = _id
        req.session.usuario = usuario
        req.session.nombre = nombre
        req.session.tipo = tipo
        req.session.maximo_tiempo_sesion_inactiva = maximo_tiempo_sesion_inactiva

        res.json({ 
            success: true, 
            session: { _id, usuario, nombre, tipo, maximo_tiempo_sesion_inactiva }
        })
    }catch(ex){
        if(ex.code){
            res.status(ex.code).json(ex)
        }else{
            console.error(ex)
        }
    }
    
})

router.post("/logout", async (req, res) => {
    if(req.session){
        req.session.destroy()
    }
    res.json({ success: true })
})

router.get("/session", async (req, res) => {
    if(req.session && req.session._id){
        const { _id, usuario, nombre, tipo, maximo_tiempo_sesion_inactiva } = req.session
        res.json({ 
            success: true, 
            session: { _id, usuario, nombre, tipo, maximo_tiempo_sesion_inactiva }
        })
    }else{
        res.status(404).json({ 
            code: 404, //Not found
            errors: [ "Sesion no encontrada" ]
        })
    }
    
})

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

export default (app) => {
    app.use("/", router)
}