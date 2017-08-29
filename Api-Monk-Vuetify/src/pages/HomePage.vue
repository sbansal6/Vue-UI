<template>
    <v-container>
        <!--select input and go button-->
        <v-layout row wrap>
            <v-flex xs1>
                <v-select
                        v-bind:items="methods"
                        v-model="methodDefault"
                        label="Select"
                        single-line
                        bottom
                        required
                ></v-select>
            </v-flex>
            <v-flex xs10>
                <v-text-field
                        name="input-1-3"
                        label="http://api.com"
                        single-line
                        class="input-group--focused"
                ></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-btn bottom
                        info
                        :loading="loading4"
                        @click.native="loader = 'loading4'"
                        :disabled="loading4"
                >Go
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
            </v-flex>
        </v-layout>

        <!--header query body-->
        <v-layout row wrap>
            <div ui buttons>
                <v-dialog v-model="queryDialog" lazy absolute>
                    <v-btn primary dark slot="activator">Query</v-btn>
                    <v-card>
                        <v-card-title>
                            <div class="headline">Use Google's location service?</div>
                        </v-card-title>
                        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="headerDialog" lazy absolute>
                    <v-btn primary dark slot="activator">Header</v-btn>
                    <v-card>
                        <v-card-title>
                            <div class="headline">Use Google's location service?</div>
                        </v-card-title>
                        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="bodyDialog" lazy absolute>
                    <v-btn primary dark slot="activator">Body</v-btn>
                    <v-card>
                        <v-card-title>
                            <div class="headline">Use Google's location service?</div>
                        </v-card-title>
                        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-layout>

        <!--grids button-->
        <v-layout row wrap>
          <div ui buttons>
              <v-btn flat>Raw</v-btn>
              <v-btn flat>Flat</v-btn>
          </div>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field
                        name="input-1"
                        textarea
                        dark
                        multi-line
                        border
                ></v-text-field>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
  const METHODS = [
      "GET","POST"
  ]
  export default {
    data () {
      return {
          "methods":METHODS,
          "methodDefault":METHODS[0],
          loader: null,
          loading4: false,
          queryDialog:false,
          headerDialog:false,
          bodyDialog: false
      }
    },
      watch: {
          loader () {
              const l = this.loader
              this[l] = !this[l]
              setTimeout(() => (this[l] = false), 3000)
              this.loader = null
          }
      },
    mounted () {
    }
  }
</script>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>