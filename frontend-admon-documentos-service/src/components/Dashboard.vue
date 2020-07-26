<template>
  <v-app id="inspire">
    <SearcherMenu />

    <AppBar />

    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :multi-line="true" :right="position === 'right'" :left="position === 'left'">
        {{ message }}

        <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="closeSnackbar"
            >
            Cerrar
            </v-btn>
        </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import AppBar from "./AppBar.vue"
import SearcherMenu from "./SearcherMenu.vue"
import { mapState } from "vuex"

export default {
    components: {
      AppBar,
      SearcherMenu
    },
    computed: {
      ...mapState(["sockets"])
    },
    data: () => ({
      snackbar: false,
      position: "",
      message: ""
    }),
    methods: {
      showSnackbar: function(message, position = ""){
        this.position = position
        this.message = message
        this.snackbar = true
      },
      closeSnackbar: function(){
        this.snackbar = false
        this.position = ""
        this.message = ""
      }
    },
    mounted: function(){
      this.sockets.new_document.on("document:new", (message) => {
        this.showSnackbar(message, "right")
      })

      this.sockets.edit_document.on("document:edit", (message) => {
        this.showSnackbar(message, "right")
      })
    }
};
</script>