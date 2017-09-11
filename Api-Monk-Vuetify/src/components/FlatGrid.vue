<template>
    <!--http://www.rent-a-hero.de/wp/wp-content/uploads/2017/04/vuegrid/#/-->
    <div>
        <vuetable ref="vuetable"
                  :data="vData"
                  :fields="vColumns"
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
        components: {
            Vuetable
        }
    }
</script>

<style>

</style>