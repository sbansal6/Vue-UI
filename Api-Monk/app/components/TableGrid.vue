<template>
    <div class="row form-group">
        <div class="col-md-12">
            <v-client-table :data="dataFlattened" :columns="columns" :options="options"></v-client-table>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { ClientTable } from 'vue-tables-2';
    import {parseJson} from '../services/flaten'
    const csvjson = require('csvjson');
    const csvOptions = {
        delimiter : ',', // optional
        quote     : '"', // optional
    };

    Vue.use(ClientTable)
    export default {
        props:['data'],
        computed:{
            dataFlattened(){
                console.log(typeof this.data)
                return csvjson.toObject(parseJson(JSON.parse(this.data)),csvOptions)
            },
            columns() {
                const columns = []
                for (let key in this.dataFlattened[0]) {
                    columns.push(key)
                }
                return columns
            },
            options() {
                return {
                    skin : 'table table-striped table-bordered table-background',
                    filterable:false,
                    sortable:[]
                }
            }

        }
    }
</script>

<style>
    .table-background {
        background-color: #eee;
        opacity: 1;
        border-radius: 4px;
    }
</style>