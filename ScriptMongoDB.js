db = db.getSiblingDB("markdownDB")

/**
 * 
 *  usuarios collection
 * 
 */
db.createCollection("usuarios", {
    validator: { $jsonSchema: {
        bsonType: "object",
        required: [ "usuario", "pass", "nombre", "ultimo_inicio_sesion", "tipo", "maximo_tiempo_sesion_inactiva"],
        properties: {
            usuario: {
                type: String
            },
            pass: {
                type: String
            },
            nombre: {
                type: String
            },
            ultimo_inicio_sesion: {
                type: Date
            },
            tipo: {
                type: String,
                enum: ["desarrollo", "implementacion", "administrador", "usuario"]
            },
            maximo_tiempo_sesion_inactiva: {
                type: Number,
                size: {
                    length: 2
                }
            }
        }
     } },
     validationAction: "warn"
});

db.usuarios.insertMany([
    {
        usuario: "john.titor",
        pass: "$2a$10$52LEB1iRG.Ln7D7xi2b9zOZFc/zapAPHryjlXZrbUQV6mcz1pe4GC", //powersheet123
        nombre: "John Titor",
        ultimo_inicio_sesion: new Date(),
        tipo: "desarrollo",
        maximo_tiempo_sesion_inactiva: 10
    },
    {
        usuario: "sara.claire",
        pass: "$2a$10$52LEB1iRG.Ln7D7xi2b9zOZFc/zapAPHryjlXZrbUQV6mcz1pe4GC", //powersheet123
        nombre: "Sara Claire",
        ultimo_inicio_sesion: new Date(),
        tipo: "implementacion",
        maximo_tiempo_sesion_inactiva: 10
    }
]);



/**
 * 
 * documentos collection
 * 
 */

 
db.createCollection("documentos", {
    validator: { $jsonSchema: {
        bsonType: "object",
        required: [ "titulo", "documento", "autor", "modificado_por", "fecha_creacion", "fecha_modificacion", "historial_cambios"],
        properties: {
            titulo: {
                type: String
            },
            documento: { //Documento texto plano en formato MD
                type: String
            },
            autor: { 
                usuario: {
                    type: String
                },
                nombre: {
                    type: String
                }
            },
            modificado_por:{
                usuario: {
                    type: String
                },
                nombre: {
                    type: String
                } 
            },        
            fecha_creacion: { //Fecha del frente
                type: Date
            },
            fecha_modificacion:{ //Fecha del frente
                type: Date
            },
            historial_cambios: [{
                documento: { //Documento texto plano en formato MD
                    type: String
                },
                fecha: { //Fecha del frente
                    type: Date
                },
                fecha_server: { //Fecha del servidor
                    type: Date
                },
                autor_cambio: { 
                    usuario: {
                        type: String
                    },
                    nombre: {
                        type: String
                    } 
                }
            }]    
        }
     } },
    validationAction: "warn"
});

db.documentos.insertMany([
    {
    titulo: "Trevor Hansen",
    documento: "# Documento de trevor",
    autor: {
        usuario: "john.titor",
        nombre: "John Titor"
    },
    modificado_por: {
        usuario: "john.titor",
        nombre: "John Titor"
    },
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    historial_cambios: []
},
{
    titulo: "Ali Connors",
    documento: "# Documento de Ali",
    autor: {
        usuario: "sara.claire",
        nombre: "Sara Claire"
    },
    modificado_por: {
        usuario: "sara.claire",
        nombre: "Sara Claire"
    },
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    historial_cambios: []
}, 
{
    titulo: "Sandra Adams",
    documento: "# Documento de sandra",
    autor: {
        usuario: "sara.claire",
        nombre: "Sara Claire"
    },
    modificado_por: {
        usuario: "sara.claire",
        nombre: "Sara Claire"
    },
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    historial_cambios: []
},
{
    titulo: "Britta Holt",
    documento: "# Documento de britta",
    autor: {
        usuario: "john.titor",
        nombre: "John Titor"
    },
    modificado_por: {
        usuario: "john.titor",
        nombre: "John Titor"
    },
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    historial_cambios: []
},
{
    titulo: "me, Scott, Jennifer",
    documento: "# Otros",
    autor: {
        usuario: "sara.claire",
        nombre: "Sara Claire"
    },
    modificado_por: {
        usuario: "sara.claire",
        nombre: "Sara Claire"
    },
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    historial_cambios: []
},
{
    titulo: "My last story - John Titor",
    documento: "# A mysterious story",
    autor: {
        usuario: "john.titor",
        nombre: "John Titor"
    },
    modificado_por: {
        usuario: "john.titor",
        nombre: "John Titor"
    },
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    historial_cambios: []
}
]);