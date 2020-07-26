# Documentación en línea usando markdown

## Instalacion
```
git clone https://github.com/johanromero5879/documentacion-enlinea-markdown.git
```
Posteriormente entrar a cada carpeta con el subfijo `-service` y ejecutar el comando `npm install`

## Servicios
Los servicios son apis independientes que se ejecutan en localhost desde diferentes puertos, los cuales se indican a continuación.

### Backend
```
    login-logout-service       - 3000
    lectura-titulos-service    - 3010
    lectura-documentos-service - 3020
    carga-documentos-service   - 3030
    edicion-documento-service  - 3040
```

### Frontend
```
    frontend-login-service             - 8000
    frontend-admon-documentos-service  - 8010
```

## Base de datos
Ejecutar el archivo `ScriptMongoDB.js` desde el shell de Mongo
Este script creará la base de datos llamada `markdownDB` e insertará datos de prueba.
Debido a que la aplicacion cuenta con bcrypt con salt 10 las contraseñas de los usuarios se encuentran encriptadas.
La contraseña de los usuarios de prueba es powerstreet123
