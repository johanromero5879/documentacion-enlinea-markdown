import { getByID } from "../models/documento"
import Schema from "validate"

const idSchema = new Schema({
    id: {
        type: String,
        match: /^[0-9a-fA-F]{24}$/,
        message: "El id no es válido"
    }
})


export const consultarPorID = async (id) => {
    const errors = idSchema.validate({ id })
    if(errors.length > 0)
        throw { code: 400, /* Bad request*/ errors: errors.map(error => error.message )  }

    return await getByID(id)
}

