<template>
    <!--http://www.rent-a-hero.de/wp/wp-content/uploads/2017/04/vuegrid/#/-->
    <div>
        <vuetable ref="vuetable"
                  :data="tableData.data"
                  :fields="tableData.columns"
                  :api-mode="false"
                  :css="css"
        ></vuetable>
    </div>
</template>

<script>
    import Vuetable from 'vuetable-2'
    const is = require('is');
    import {parseJson} from '../services/flaten'
    const csvjson = require('csvjson');
    const csvOptions = {
        delimiter : ',', // optional
        quote     : '"', // optional
    };

    export default {
        props:['response','dataKey','paginationKey'],
        data(){
            return {
                css :{
                    tableClass: 'ui selectable celled stackable attached table',
                    loadingClass: 'loading',
                    ascendingIcon: 'blue chevron up icon',
                    descendingIcon: 'blue chevron down icon',
                    detailRowClass: 'vuetable-detail-row',
                    sortHandleIcon: 'grey sidebar icon'
                }
            }
        },
        computed:{
            tableData(){
              const tableObject = {
                  data:undefined,
                  columns:[]
              }
                if (this.response.data){
                  if (is.array(this.response.data)) {
                      tableObject["data"] = this.response.data
                      for (let key in this.response.data[0]) {
                          tableObject["columns"].push(key)
                      }
                  }
                  if (is.object(this.response.data) && this.dataKey && this.paginationKey){
                      tableObject["data"] = this.response.data[this.dataKey]
                      for (let key in this.response.data[this.dataKey][0]) {
                          tableObject["columns"].push(key)
                      }
                  }
                }
                console.log(tableObject)
                return tableObject
            }
        },
        components: {
            Vuetable
        }
    }
</script>

<style>
    .vuetable {
        tableClass: 'ui selectable celled stackable attached table'
    }
    vuetable {
        tableClass: 'ui selectable celled stackable attached table'
    }
</style>