import run from "./server"

try{
    run()
}catch(ex){
    console.error(ex.message)
}