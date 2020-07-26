<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="Login"
                    prepend-icon="mdi-account"
                    v-model="credenciales.usuario"
                    :rules="[rules.required, rules.min]"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="[rules.required, rules.min]"
                    v-model="credenciales.pass"
                  ></v-text-field>
                  <v-alert v-if="alert.show" :type="alert.type" text dense v-html="alert.message"></v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
    data: () => ({
        credenciales: {
            usuario: "",
            pass: "",
        },
        alert: {
            show: false,
            type: "",
            message: "",
        },
        rules: {
            required: (value) => !!value || "Requerido",
            min: (value) => value.length >= 3 || "Mínimo 3 caracteres",
        },
    }),
    methods: {
        showAlert: function (message, type) {
            this.alert.type = type;
            this.alert.message = message;
            this.alert.show = true;

            setTimeout(() => {
                this.alert.show = false;
                this.alert.type = "";
                this.alert.message = "";
            }, 4000);
        },

        login: async function () {
            try {
                if (!this.$refs.form.validate())
                    throw "Formulario no se ha llenado correctamente";

                const { usuario, pass } = this.credenciales;

                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usuario, pass })
                })

                const json = await response.json()

                if(response.status !== 200)
                    throw json

                
                window.location = "http://localhost:8010/dashboard"
            } catch (ex) {
                if (ex.errors) {
                    const mensage = ex.errors.reduce((acum, error) => `${acum}${error}<br>`, "")

                    this.showAlert(mensage, "error");
                } else {
                    this.showAlert(ex, "error");
                }
            }
        }
    },
};
</script>
