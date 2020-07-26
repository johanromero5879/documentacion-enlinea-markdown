import { getUltimosTitulos, getDocumentosPorTitulo } from "../models/documento"

const validateLimit = (limit) => {
    if(limit <= 0)
        throw { code: 400, /*Bad request*/ errors: ["El limite debe ser un numero mayor a cero"] }
}

export const consultarUltimosTitulos = async (limit) => {
    validateLimit(limit)
    return await getUltimosTitulos(limit)
}

export const consultarDocumentosPorTitulo = async (search, limit) => {
    validateLimit(limit)
    return await getDocumentosPorTitulo(search, limit)
}

