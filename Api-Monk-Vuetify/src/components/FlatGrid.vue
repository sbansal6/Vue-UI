<template>
    <!--http://www.rent-a-hero.de/wp/wp-content/uploads/2017/04/vuegrid/#/-->
    <div>
        <vuetable ref="vuetable"
                  :data="tableData.data"
                  :fields="tableData.columns"
                  :api-mode="false"
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
        computed:{
            tableData(){
              const tableObject = {
                  data:undefined,
                  columns:[]
              }
                if (this.response.data){
                    tableObject["data"] = this.response.data
                    for (let key in this.response.data[0]) {
                        tableObject["columns"].push(key)
                    }
                }
                return tableObject
            }
        },
        components: {
            Vuetable
        }
    }
</script>

<style>

</style>