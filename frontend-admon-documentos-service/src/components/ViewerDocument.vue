<template>
    <div id="editor">
        <v-container>
            <v-row id="titulo-container" v-if="mode === 'preview'">
                <v-col sm="6">
                    <v-text-field
                        label="Titulo"
                        outlined
                        dense
                        v-model="document.titulo"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12">
                    <Editor 
                        v-model="document.documento" 
                        :outline="true"
                        color="#eeeeee"
                        :emoji="false" 
                        :image="false"
                        :mode="mode"
                    />
                </v-col>
            </v-row>
        </v-container>
        
    </div>
</template>

<script>
import { Editor } from "vuetify-markdown-editor"
import { mapState } from "vuex"

export default {
    components: {
        Editor
    },
    computed: {
        ...mapState(["mode", "document"])
    },
    data: () => ({
        
    })
}
</script>

<style>
    #editor{
        border: 1px solid rgba(0, 0, 0, .25);
        border-radius: 10px;
    }

    #titulo-container{
        height: 45px;
        padding-left: 10px;
    }
</style>