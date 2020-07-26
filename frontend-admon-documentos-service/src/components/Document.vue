<template>
    <div>
        <AdmonDocument />
        <ViewerDocument />
        <DetailsDocument v-if="$route.name === 'edit-document' && mode !== 'preview'"/>
    </div>
</template>

<script>
import AdmonDocument from "./AdmonDocument.vue"
import ViewerDocument from "./ViewerDocument.vue"
import DetailsDocument from "./DetailsDocument"

import { mapMutations, mapState } from "vuex"

export default {
    components: {
        AdmonDocument,
        ViewerDocument,
        DetailsDocument
    },
    watch: {
        $route: function(to, from){
            this.handleRoute()
        }
    },
    data: () => ({
        snackbar: false,
        message: "",
        position: ""
    }),
    computed: {
        ...mapState(["mode"])
    },
    methods: {
        ...mapMutations(["setMode", "loadDocument", "setNewDocument"]),
        getDocument: async function(id){
            const response = await fetch(`http://localhost:3020/document/${id}`, { credentials: "include" })
            const json = await response.json()

            if(response.status !== 200)
                throw json

            const { documento } = json
            if(!documento)
                throw new Error("Documento no encontrado")

            return documento
        },
        showSnackbar: function(message, position = ""){
            this.position = position
            this.message = message
            this.snackbar = true
        },
        closeSnackbar: function(){
            this.snackbar = false
            this.position = ""
            this.message = ""
        },
        handleRoute: async function (){
            switch(this.$route.name){
                case "new-document":
                    this.setNewDocument()
                    this.setMode("preview")
                    break
                case "edit-document":
                    try{
                        const document = await this.getDocument(this.$route.params.id)
                        this.loadDocument(document)
                        this.setMode("viewer")
                    }catch(ex){
                        this.setNewDocument()
                        //this.showSnackbar("Error al cargar el documento", "left")
                        this.$router.push({ path: "/dashboard" })
                    }
                    break
            }
        }
    },
    created: async function(){
        this.handleRoute()
    }
}
</script>