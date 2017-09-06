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
            <v-flex xs12>
                <div ui buttons>
                    <v-btn-toggle v-model="toggle_exclusive">
                        <v-btn flat>Raw</v-btn>
                        <v-btn flat>Flat</v-btn>
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
                                <v-select
                                        label="Data"
                                        required
                                        :items="dataProperties"
                                ></v-select>
                                <v-select
                                        label="Pagination"
                                        required
                                        :items="dataProperties"
                                ></v-select>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="blue--text darken-1" flat @click.native="parseDialog = false">Close</v-btn>
                                <v-btn class="blue--text darken-1" flat @click.native="parseDialog = false">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-flex>

        </v-layout>

        <!--grids components-->
        <v-layout row wrap>
            <v-flex xs12>
                <codemirror v-if="rawGrid" style="min-height:500px !important; box-sizing: border-box" v-model="rawData" :options="editorOptions"></codemirror>
            </v-flex>
        </v-layout>
        <v-layout row wrap >
            <v-flex xs12>
                <v-data-table v-if="flatGrid"
                        v-bind:headers="headers"
                        :items="items"
                        hide-actions
                        class="elevation-1"
                >
                    <template slot="items" scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.calories }}</td>
                        <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td>
                        <td class="text-xs-right">{{ props.item.sodium }}</td>
                        <td class="text-xs-right">{{ props.item.calcium }}</td>
                        <td class="text-xs-right">{{ props.item.iron }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
  import taffy from '../services/taffy'
  import { codemirror, CodeMirror } from 'vue-codemirror'
  const is = require('is');
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
          parseDialog: false,
          data:undefined,
          status:undefined,
          statusText:undefined,
          editorOptions: {
              // codemirror options
              tabSize: 4,
              mode: 'text/javascript',
              theme: 'base16-dark',
              lineNumbers: true,
              line: true,
              readOnly:true

          },
          ex11: false,
          toggle_exclusive: 0,
          headers: [
              {
                  text: 'Dessert (100g serving)',
                  align: 'left',
                  sortable: false,
                  value: 'name'
              },
              { text: 'Calories', value: 'calories' },
              { text: 'Fat (g)', value: 'fat' },
              { text: 'Carbs (g)', value: 'carbs' },
              { text: 'Protein (g)', value: 'protein' },
              { text: 'Sodium (mg)', value: 'sodium' },
              { text: 'Calcium (%)', value: 'calcium' },
              { text: 'Iron (%)', value: 'iron' }
          ],
          items: [
              {
                  value: false,
                  name: 'Frozen Yogurt',
                  calories: 159,
                  fat: 6.0,
                  carbs: 24,
                  protein: 4.0,
                  sodium: 87,
                  calcium: '14%',
                  iron: '1%'
              },
              {
                  value: false,
                  name: 'Ice cream sandwich',
                  calories: 237,
                  fat: 9.0,
                  carbs: 37,
                  protein: 4.3,
                  sodium: 129,
                  calcium: '8%',
                  iron: '1%'
              },
              {
                  value: false,
                  name: 'Eclair',
                  calories: 262,
                  fat: 16.0,
                  carbs: 23,
                  protein: 6.0,
                  sodium: 337,
                  calcium: '6%',
                  iron: '7%'
              },
              {
                  value: false,
                  name: 'Cupcake',
                  calories: 305,
                  fat: 3.7,
                  carbs: 67,
                  protein: 4.3,
                  sodium: 413,
                  calcium: '3%',
                  iron: '8%'
              },
              {
                  value: false,
                  name: 'Gingerbread',
                  calories: 356,
                  fat: 16.0,
                  carbs: 49,
                  protein: 3.9,
                  sodium: 327,
                  calcium: '7%',
                  iron: '16%'
              },
              {
                  value: false,
                  name: 'Jelly bean',
                  calories: 375,
                  fat: 0.0,
                  carbs: 94,
                  protein: 0.0,
                  sodium: 50,
                  calcium: '0%',
                  iron: '0%'
              },
              {
                  value: false,
                  name: 'Lollipop',
                  calories: 392,
                  fat: 0.2,
                  carbs: 98,
                  protein: 0,
                  sodium: 38,
                  calcium: '0%',
                  iron: '2%'
              },
              {
                  value: false,
                  name: 'Honeycomb',
                  calories: 408,
                  fat: 3.2,
                  carbs: 87,
                  protein: 6.5,
                  sodium: 562,
                  calcium: '0%',
                  iron: '45%'
              },
              {
                  value: false,
                  name: 'Donut',
                  calories: 452,
                  fat: 25.0,
                  carbs: 51,
                  protein: 4.9,
                  sodium: 326,
                  calcium: '2%',
                  iron: '22%'
              },
              {
                  value: false,
                  name: 'KitKat',
                  calories: 518,
                  fat: 26.0,
                  carbs: 65,
                  protein: 7,
                  sodium: 54,
                  calcium: '12%',
                  iron: '6%'
              }
          ]
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
                                    self.status = response.status
                                    self.statusText = response.statusText
                                    self.data = response.data
                                    self.loading4  = false
                                }
                        )
                        .catch(function(error){ß
                            self.data = JSON.stringify(error.response.data,null,4)
                            self.status = JSON.stringify(error.response.status)
                            self.statusText = JSON.stringify(error.response.statusText)
                            self.loading4  = false
                        })
            }
        },
        onParseSave:function(){
            this.parseDialog = false

        }
    },
    computed: {
        rawData() {
            return JSON.stringify(this.data,null,4)
        },
        dataProperties() {
            let properties = []
            if (is.object(this.data)){
                console.log('here')
                for (let key in this.data){
                    properties.push(key)
                }
            }
            return properties
        },
        rawGrid(){
            return this.toggle_exclusive === 0
        },
        flatGrid(){
            return this.toggle_exclusive === 1
        }
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