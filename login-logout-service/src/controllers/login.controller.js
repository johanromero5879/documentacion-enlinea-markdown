import Schema from "validate"
import { getUsuario, setUltimoInicioSesion } from "../models/usuario"
import { compareSync } from "bcryptjs"
/**
 * Creación de un Schema para validar credenciales que provengan de una peticion http
 */
const credencialesSchema = new Schema({
    usuario: {
        type: String,
        required: true,
        length: { min: 3, max: 32 }
    },
    pass: {
        type: String,
        required: true,
        length: { min: 3, max: 32 }
    }
})

export const validarSchema = (obj) => {
    const errors = credencialesSchema.validate(obj)
    if(errors.length > 0){
        throw { 
            code: 400, //Bad request
            errors: errors.map(error => error.message) 
        }
    } 
}

export const login = async (credenciales) => {
    try{
        validarSchema(credenciales)
        const resultado = await getUsuario(credenciales.usuario)
        if(resultado && compareSync(credenciales.pass, resultado.pass)){
            const {  _id, usuario, nombre, tipo, maximo_tiempo_sesion_inactiva } = resultado
            await setUltimoInicioSesion(_id)
            return { _id, usuario, nombre, tipo, maximo_tiempo_sesion_inactiva }
        }else{
            throw { code: 404, /*Not found*/ errors: ["Credenciales no coinciden"] }
        }
    }catch(ex){
        throw ex
    }
}


