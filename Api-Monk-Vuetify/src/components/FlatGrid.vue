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
        props:['response','vData','vColumns'],
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
        },
        components: {
            Vuetable
        }
    }
</script>

<style>

</style>