<template>
    <!--http://www.rent-a-hero.de/wp/wp-content/uploads/2017/04/vuegrid/#/-->
    <div>
        <vuetable ref="vuetable"
                  :data="dataFlattened.data"
                  :fields="columns"
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
        props:['data'],
        computed:{
            dataFlattened(){
                //console.log('data',JSON.stringify(csvjson.toObject(parseJson(this.data),csvOptions),null,4))
                return this.data
            },
            columns() {
                const columns = []
                for (let key in this.dataFlattened[0]) {
                    columns.push(key)
                }
                console.log('columns',JSON.stringify(columns,null,4))
                return [
                   "id"
                ]
            }
        },
        components: {
            Vuetable
        }
    }
</script>

<style>

</style>