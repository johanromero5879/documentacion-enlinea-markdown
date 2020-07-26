<template>
  <v-app-bar app color="blue darken-3" dark :clipped-left="$vuetify.breakpoint.lgAndUp">
    <v-app-bar-nav-icon @click.stop="drawer.show = !drawer.show"></v-app-bar-nav-icon>

    <router-link to="/dashboard">
      <v-toolbar-title>
        Aplicacion
      </v-toolbar-title>
    </router-link>
    
    <v-spacer></v-spacer>
    
    <v-menu :offset-y="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
            {{ session.nombre }}<v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="onlogout">
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import { logout, getSession } from "../utils"


export default {
    computed: {
        ...mapState(["session", "drawer"]),
        show: {
            set: function (show){
                this.$store.commit("setDrawer", { show })
            },
            get: function(){
                return this.drawer.show
            }
        },
    },
    data: () => ({
        startInactivity: null
    }),
    methods: {
        ...mapMutations(["setSession"]),
        onlogout: function(){
            logout()
        },
        resetInactivity: function (){
            if(this.startInactivity){
                clearTimeout(this.startInactivity)
            }
            
            const time = 1000 * 60 * this.session.maximo_tiempo_sesion_inactiva // x min
            this.startInactivity = setTimeout(logout, time)
        }
    },
    mounted: async function (){
        try{
            const session = await getSession()
            await this.setSession(session)

            this.resetInactivity()

            document.body.addEventListener("click", this.resetInactivity, false)
        }catch(ex){
            logout()
        }
    }
};
</script>

<style>
    a{
        color: #FFFFFF !important;
        text-decoration: none !important;
    }
  
</style>