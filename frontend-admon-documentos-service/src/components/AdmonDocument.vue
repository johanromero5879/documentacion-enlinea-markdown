<template>
    <div>
        <v-btn class="ma-2" color="primary" v-if="!isNew && mode === 'viewer'" @click="onEdit">Editar</v-btn>
        <div id="admon-buttons">
            <template v-if="mode === 'preview'">
                <v-btn
                    outlined
                    color="primary"
                    class="ma-2"
                    :loading="isSelecting"
                    @click="onButtonClick"
                >
                    <v-icon left>
                        mdi-upload
                    </v-icon>
                    Subir documento
                </v-btn>
                <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    accept=".md,.markdn,.mdown"
                    @change="onFileChanged"
                >
            </template>

            
            <template v-if="mode === 'preview'">
                <v-btn class="ma-2" @click="onSave" color="primary">Guardar</v-btn>
                <v-btn class="ma-2" @click="onCancel" >Cancelar</v-btn>
            </template>
        </div>

        <v-alert :value="alert.show" :type="alert.type" text dense transition="scale-transition" v-html="alert.message"></v-alert>
    </div>
    
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
    computed: {
        ...mapState(["document_loaded", "document", "mode", "sockets", "session"]),
        isNew: function(){
            return this.$route.name === "new-document"
        }
    },
    data: () => ({
        selectedFile: null,
        isSelecting: false,
        alert: { show: false, type: "info", message: "Default"}
    }),
    methods: {
        ...mapMutations(["setMode", "resetDocument", "saveDocumentLoaded", "setDocument"]),
        onEdit: function(){
            this.setMode("preview")
        },
        onCancel: function(){
            this.resetDocument()
            if(this.$route.name === "edit-document"){
                this.setMode("viewer")
            }else{
                this.$router.push({ path: "/dashboard" })
            }
        },
        validate: function(){
            let errors = ""
            // Validacion titulo
            if(this.document.titulo.trim()){
                if(this.document.titulo.length < 3){
                    errors += "El titulo debe tener minimo 3 caracteres<br>"
                }
            }else{
                errors += "El titulo es requerido<br>"
            }

            // Validacion documento
            if(this.document.documento.trim()){
                if(this.document.documento.length < 10){
                    errors += "El documento debe tener minimo 10 caracteres<br>"
                }
            }else{
                errors += "El documento es requerido<br>"
            }

            return errors
        },
        onSave: async function(){
            try{
                const errors = this.validate()
                if(errors)
                    throw new Error(errors)

                const { titulo, documento, fecha_creacion, fecha_modificacion } = this.document

                if(this.isNew){
                    const newDocument = {
                        titulo, documento, fecha_creacion,
                        fecha_modificacion: new Date()
                    }
                    const { autor, _id } = await this.saveNew(newDocument)

                    this.sockets.new_document.emit("document:new", `${autor.nombre} acabo de crear el documento ${titulo}`)

                    this.$router.push({ name: "edit-document", params: { id: _id } })
                }else{
                    const editedDocument = {
                        titulo, documento,
                        fecha_modificacion: new Date()
                    }
                    
                    await this.editDocument(editedDocument)
                    
                    const { usuario, nombre } = this.session

                    let message = `${nombre} acabo de editar el documento ${titulo}`
                    message += this.document_loaded.titulo !== titulo ? ` por ${titulo}`: ""

                    
                    this.setDocument({ 
                        modificado_por: { usuario, nombre }, 
                        fecha_modificacion: editedDocument.fecha_modificacion
                    })

                    this.saveDocumentLoaded()

                    this.sockets.edit_document.emit("document:edit", message)
                    this.setMode("viewer")
                }
            }catch(ex){
                if(ex.message){
                    this.showAlert(ex.message, "error")
                }else{
                    this.showAlert("Error al guardar el documento", "error")
                }
            }
        },
        showAlert: function(message, type = "info"){
            this.alert.type = type
            this.alert.message = message
            this.alert.show = true

            setTimeout(() => {
                this.alert.show = false
                this.alert.message = ""
            }, 4000)
        },
        onButtonClick() {
            this.isSelecting = true
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true })

            this.$refs.uploader.click()
        },
        onFileChanged(e) {
            this.selectedFile = e.target.files[0]
            const reader = new FileReader()
           
            reader.onload = (e) => {
                const filename = this.selectedFile.name.split(".")
                const ext = filename[filename.length-1]
                const isValidExt = ["md", "markdn" , "mdown"].some((e) => e === ext)

                if(isValidExt){
                    const name = filename.slice(0, -1).reduce((acum, n) => `${acum ? acum + '.' : ""}${n}`, "")
                    this.setDocument({ 
                        titulo: name,
                        documento: reader.result
                    })
                }else{
                    this.selectedFile = null
                    this.$refs.uploader.value = ""
                    this.showAlert("El archivo seleccionado no tiene formato markdown", "error")
                }
            }

            reader.onerror = (e) => {
                this.selectedFile = null
                this.$refs.uploader.value = ""
                this.showAlert("Error al subir el archivo", "error")
            }

            reader.readAsText(this.selectedFile)
        },
        saveNew: async function (newDocument){
            const response = await fetch("http://localhost:3030/document", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newDocument)
            })
            
            const json = await response.json()

            if(response.status !== 200)
                throw json

            return json.documento 
        },
        editDocument: async function(editedDocument){
            const response = await fetch(`http://localhost:3040/document/${this.$route.params.id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedDocument)
            })
            
            const json = await response.json()

            if(response.status !== 200)
                throw json

        },
    }
}
</script>

<style>
    #admon-buttons{
        display: flex; 
        justify-content: center;
    }

</style>