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
                <v-btn info
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

        <!-- header | query |  body dialogs-->
        <v-layout row wrap>
            <v-flex xs12>
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
            </v-flex>
        </v-layout>

        <!--grids button-->
        <v-layout row wrap>
            <v-flex xs7>
                <div ui buttons>
                    <v-btn-toggle v-model="grid_toggle">
                        <v-btn flat>Raw</v-btn>
                        <v-btn @click.stop="showFlatGrid" flat>Flat</v-btn>
                        <v-btn flat>Sql</v-btn>
                        <v-btn flat>Charts</v-btn>
                    </v-btn-toggle>
                    <v-dialog v-model="parseDialog" lazy absolute>
                        <v-btn icon class="primary--text" slot="activator">
                            <v-icon>settings</v-icon>
                        </v-btn>
                        <v-card>
                            <v-card-title>
                          <span class="headline">Parse
                          <v-switch v-model="ex11"></v-switch>
                           </span>
                            </v-card-title>
                            <v-card-text>
                                <v-select v-model="dataKey"
                                        label="Data"
                                        required
                                        :items="dataProperties"
                                ></v-select>
                                <v-select v-model="paginationKey"
                                        label="Pagination"
                                        required
                                        :items="dataProperties"
                                ></v-select>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="blue--text darken-1" flat @click.native="parseDialog = false">Close</v-btn>
                                <v-btn class="blue--text darken-1" flat @click.native="onParseSave">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-flex>
            <v-flex xs5>
                <response-bar :response="response"></response-bar>
            </v-flex>
        </v-layout>

        <v-btn flat @click.stop="destroy">Destroy</v-btn>
        <!--GRID COMPONENTS-->
        <!--raw grid-->
        <v-layout row wrap>
            <v-flex xs12>
                <raw-grid v-if="rawGrid" :response="response"></raw-grid>
            </v-flex>
        </v-layout>



        <!--flat grid-->
        <v-layout row wrap >
            <v-flex xs12>
                <flat-grid ref="refFlatGrid" v-if="flatGrid" :response="response" :vColumns="vColumns" :vData="vData"></flat-grid>
            </v-flex>
        </v-layout>
        <!--END GRID COMPONENTS-->

    </v-container>
</template>

<script>
  import taffy from '../services/taffy'
  import RawGrid from '../components/RawGrid.vue'
  import FlatGrid from '../components/FlatGrid.vue'
  import ResponseBar from '../components/ResponseBar.vue'

  const is = require('is');
  const REST_METHODS = [
      "GET","POST"
  ];

  const dummyResponse = {
      "data":[
             {"id":"136","created_at":"2015-11-29T19:30:09+0000","type":"website","network_id":"6035445129950","name":"Marin Careers Audience","nb_users":"1600","rule":{"and":[{"or":[{"url":{"eq":"www.marinsoftware.com\/about-us\/careers"}}]}]},"pixel":"321"}
      ],
      "data2":[{"id":"136","created_at":"2015-11-29T19:30:09+0000"}]
  }
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
          parseDialog: false,
          ex11: false,
          grid_toggle: 0,
          response:undefined,
          dataKey:undefined,
          paginationKey:undefined,
          flatGrid:false
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
                                    self.response = response
                                    self.loading4  = false
                                }
                        )
                        .catch(function(error){
                            self.data = JSON.stringify(error.response.data,null,4)
                            self.status = JSON.stringify(error.response.status)
                            self.statusText = JSON.stringify(error.response.statusText)
                            self.loading4  = false
                        })
            }
        },
        onParseSave:function(){
            this.parseDialog = false
            this.flatGrid = true
            if (this.$refs["refFlatGrid"]) {
                this.$refs["refFlatGrid"]['vData'] = this.vData
                this.$refs["refFlatGrid"]['vColumns'] = this.vColumns
                this.$refs["refFlatGrid"].$refs['vuetable'].normalizeFields()
            }
            },
        showFlatGrid(){
          if (this.response && is.array(this.response.data)){
              this.flatGrid = true
          } else {
              this.parseDialog = true
          }

        },
        destroy(){
           this.response = {}
           this.response["data"] = dummyResponse
        }
    },
    computed: {
        rawData() {
            return JSON.stringify(this.data,null,4)
        },
        dataProperties() {
            let properties = []
            if (this.response){
                if (is.object(this.response.data)){
                    for (let key in this.response.data){
                        properties.push(key)
                    }
                }
            }
            return properties
        },
        rawGrid(){
            return this.grid_toggle === 0
        },
        vColumns(){
            let columns = []
            if (this.response) {
                if (is.array(this.response.data)) {
                    for (let key in this.response.data[0]) {
                        columns.push(key)
                    }
                }
                if (is.object(this.response.data) && this.dataKey && this.paginationKey){
                    for (let key in this.response.data[this.dataKey][0]) {
                        columns.push(key)
                    }
                }
            }
            return columns
        },
        vData() {
            let data = []
            if (this.response) {
                if (is.array(this.response.data)) {
                    console.log('vdata Changed')
                    data =  this.response.data
                }
                if (is.object(this.response.data) && this.dataKey && this.paginationKey){
                    console.log('vdata Changed')
                    data =  this.response.data[this.dataKey]
                }
            }
            console.log('new data',data)
            return data
        }
    },
    components :{
        RawGrid,FlatGrid,ResponseBar
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