<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>Detalles</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12">
                <strong>Titulo: </strong>{{ document_loaded.titulo }}
            </v-col>
            <v-col cols="12" sm="6" order-sm="1">
                <strong>Autor: </strong>{{ document_loaded.autor.nombre }}
            </v-col>
            <v-col cols="12" sm="6" order-sm="3">
              <strong>Fecha creación: </strong>{{ document_loaded.fecha_creacion | formatedDate}}
            </v-col>
            <v-col cols="12" sm="6" order-sm="2">
                <strong>Actualizado por: </strong>{{ document_loaded.modificado_por.nombre }}
            </v-col>
            <v-col cols="12" sm="6" order="4">
                <strong>Fecha modificacion: </strong>{{ document_loaded.fecha_modificacion | formatedDate}}
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState } from "vuex"
import moment from "moment"
export default {
  filters: {
    formatedDate: (date) => moment(date).locale("es").format('D [de] MMM [del] YYYY, h:mm A')
  },
  computed: {
    ...mapState(["document_loaded"])
  }
};
</script>