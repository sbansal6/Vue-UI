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
                        v-model="url"
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
                        @click.native="onGo"
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
                            <v-btn class="green--text darken-1" flat="flat" @click.native="bodyDialog = false">Disagree</v-btn>
                            <v-btn class="green--text darken-1" flat="flat" @click.native="bodyDialog = false">Agree</v-btn>
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
              <v-dialog v-model="settingsDialog" lazy absolute>
                  <v-btn icon class="primary--text" slot="activator">
                      <v-icon>settings</v-icon>
                  </v-btn>
                  <v-card>
                      <v-card-title>
                          <span class="headline">Settings</span>
                      </v-card-title>
                      <v-card-text>
                          <v-select
                                  label="Data"
                                  required
                                  :items="['0-17', '18-29', '30-54', '54+']"
                          ></v-select>
                          <v-select
                                  label="Pagination"
                                  required
                                  :items="['0-17', '18-29', '30-54', '54+']"
                          ></v-select>
                      </v-card-text>
                      <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn class="blue--text darken-1" flat @click.native="settingsDialog = false">Close</v-btn>
                          <v-btn class="blue--text darken-1" flat @click.native="settingsDialog = false">Save</v-btn>
                      </v-card-actions>
                  </v-card>
              </v-dialog>
          </div>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12>
                <codemirror style="min-height:500px !important; box-sizing: border-box" v-model="rawData" :options="editorOptions"></codemirror>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
  import taffy from '../services/taffy'
  import { codemirror, CodeMirror } from 'vue-codemirror'
  const REST_METHODS = [
      "GET","POST"
  ]
  export default {
    data () {
      return {
          url:"",
          methods:REST_METHODS,
          methodDefault:REST_METHODS[0],
          loader: false,
          loading4: false,
          queryDialog:false,
          headerDialog:false,
          bodyDialog: false,
          settingsDialog: false,
          data:"Sample Data",
          editorOptions: {
              // codemirror options
              tabSize: 4,
              mode: 'text/javascript',
              theme: 'Base16-Light',
              lineNumbers: true,
              line: true,
              readOnly:true

          }
      }
    },
    mounted () {
    },
    methods :{
        onGo:function () {
            const self = this
            if(this.url.length > 0){
                this.loading4 = true
                taffy.go('GET',this.url,null,{})
                        .then(
                                function(response){
                                    console.log(response)
//                                    self.status = response.status
//                                    self.statusText = response.statusText
                                    self.data = response.data
                                    self.loading4  = false
                                }
                        )
                        .catch(function(error){
                            console.log(error)
//                            self.text = JSON.stringify(error.response.data,null,4)
//                            self.status = JSON.stringify(error.response.status)
//                            self.statusText = JSON.stringify(error.response.statusText)
                            self.loading4  = false
                        })
            }
        },
    },
    computed: {
        rawData() {
            return JSON.stringify(this.data,null,4)
        },
    },
      components :{
          codemirror
      }
  }
</script>

<style>
    .CodeMirror {
        border: 1px solid #eee;
        min-height: 600px;
        max-height: 600px;
    }
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