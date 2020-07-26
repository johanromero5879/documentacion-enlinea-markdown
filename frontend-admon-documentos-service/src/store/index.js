import Vue from 'vue'
import Vuex from 'vuex'
import io from "socket.io-client"

Vue.use(Vuex)

const getEmptyDocument = () => ({
  titulo: "",
  documento: "",
  autor: { usuario: "", nombre: "" },
  fecha_creacion: new Date(),
  fecha_modificacion: "",
  modificado_por: { usuario: "", nombre: "" }
})

export default new Vuex.Store({
  state: {
    session: {
      _id: "",
      usuario: "",
      nombre: "",
      tipo: "",
      maximo_tiempo_sesion_inactiva: 60
    },
    sockets: {
      new_document: io("http://localhost:3030"),
      edit_document: io("http://localhost:3040")
    },
    drawer: {
      show: null
    },
    mode: "preview",
    document: getEmptyDocument(),
    document_loaded: getEmptyDocument()
  },
  mutations: {
    setSession: (state, session) => {
      state.session = session
    },
    setDrawer: (state, drawer) => {
      state.drawer = drawer
    },
    setMode: (state, mode) => {
      state.mode = mode
    },
    setDocument: (state, document) => {
      state.document = {...state.document, ...document} //clone state.document
    },
    saveDocumentLoaded: (state) => {
      state.document_loaded = {...state.document} //clone state.document
    },
    loadDocument: (state, document) => {
      state.document = {...state.document, ...document}
      state.document_loaded = {...state.document_loaded, ...document}
    },
    resetDocument: (state) => {
      state.document = {...state.document_loaded}
    },
    setNewDocument: (state) => {
      state.document_loaded = getEmptyDocument()
      state.document = getEmptyDocument()
    }
  },
  actions: {
  },
  modules: {
  }
})
