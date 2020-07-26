<template>
  <v-navigation-drawer v-model="drawer.show" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-text-field
        background-color="#EEEEEE"
        flat
        solo
        prepend-inner-icon="mdi-magnify"
        label="Search"
        v-model="search"
        @keyup="searchDocuments"
    ></v-text-field>
    <v-list dense v-if="titles.length > 0">
      <v-list-item link v-for="title in titlesWithNew" :key="title._id" @click="() => redirectDocument(title._id)">
        <v-list-item-action>
          <v-icon>{{  title._id !== 0 ? "mdi-file-document-outline" : "mdi-plus" }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ title.titulo }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div v-else id="info-titles">
        {{ info_message }}
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex"

export default {
    computed: {
        ...mapState(["drawer"]),
        show: {
            set: function (show){
                this.$store.commit("setDrawer", { show })
            },
            get: function(){
                return this.drawer.show
            }
        },
        titlesWithNew: function(){
            return [...this.titles, { _id: "new", titulo: "Nuevo" }]
        }
    },
    data: () => ({
        titles: [],
        search: "",
        info_message: "Test"
    }),
    methods: {
        searchDocuments: async function(){
            try{
                if(this.search.trim()){
                    const response = await fetch(`http://localhost:3010/document/title/${this.search.trim()}`, { credentials: "include" })

                    if(response.status !== 200)
                        throw new Error("Error al buscar los titulos")
                    
                    const { documentos } = await response.json()

                    if(documentos.length === 0)
                        throw new Error("No se encontraron documentos")

                    this.titles = documentos
                }else{
                    this.searchLastDocuments()
                }
            }catch(ex){
                this.info_message = ex.message
                this.titles = []
            }
        },
        searchLastDocuments: async function(){
            try{
                const response = await fetch(`http://localhost:3010/document/title/last`, { credentials: "include" })

                if(response.status !== 200)
                    throw new Error("Error al buscar los titulos")
                
                const { documentos } = await response.json()

                if(documentos.length === 0)
                    throw new Error("No se encontraron documentos")

                this.titles = documentos
            }catch(ex){
                this.info_message = ex.message
                this.titles = []
            }
        },
        redirectDocument: function (id){
            if(id !== "new"){
                this.$router.push({ name: "edit-document", params: { id } })
            }else{
                this.$router.push({ name: "new-document" })
            }
        }
    },
    mounted: function (){
        this.searchLastDocuments()
    }
};
</script>

<style>
    #info-titles{
        text-align: center;
    }
</style>