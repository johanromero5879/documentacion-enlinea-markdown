import { updateOneDoc } from "../models/documento"
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
    fecha_modificacion: {
        type: Date,
        required: true,
        use: { isValidDate }
    },
    modificado_por: {
        usuario: {
            type: String
        },
        nombre: {
            type: String
        }
    }
})

const idSchema = new Schema({
    id: {
        type: String,
        match: /^[0-9a-fA-F]{24}$/,
        message: "El id no es válido"
    }
})

const throwErrors = (errors) => {
    if(errors.length > 0)
        throw { code: 400, /* Bad request*/ errors: errors.map(error => error.message )  }
}

export const editarDocumento = async (id, document) => {
    let errors = idSchema.validate({ id })
    throwErrors(errors)
    errors = documentSchema.validate(document)
    throwErrors(errors)

    await updateOneDoc(id, document)
}

