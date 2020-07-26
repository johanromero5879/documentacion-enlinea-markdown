import { insertOneDoc } from "../models/documento"
import Schema from "validate"

const isValidDate = (date) => !isNaN(date.getTime())

const documentSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        length: { min: 3 }
    },
    documento: {
        type: String,
        required: true,
        length: { min: 10 }
    },
    fecha_creacion: {
        type: Date,
        required: true,
        use: { isValidDate }
    },
    fecha_modificacion: {
        type: Date,
        required: true,
        use: { isValidDate }
    },
    autor: {
        usuario: {
            type: String
        },
        nombre: {
            type: String
        }
    },
    modificado_por: {
        usuario: {
            type: String
        },
        nombre: {
            type: String
        }
    },
    historial_cambios: {
        type: Array
    }
})


export const insertarDocumento = async (document) => {
    const errors = documentSchema.validate(document)
    if(errors.length > 0)
        throw { code: 400, /* Bad request*/ errors: errors.map(error => error.message )  }
    
    return await insertOneDoc(document)
}

