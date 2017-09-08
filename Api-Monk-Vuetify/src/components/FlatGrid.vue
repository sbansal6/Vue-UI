<template>
    <!--http://www.rent-a-hero.de/wp/wp-content/uploads/2017/04/vuegrid/#/-->
    <v-data-table
                  v-bind:headers="columns"
                  :items="items"
                  hide-actions
                  class="elevation-1"
    >

            <td v-for="column in columns" class="text-xs-right">
                {{ column }}
            </td>
            <!--<td>{{ props.item.name }}</td>-->
            <!--<td class="text-xs-right">{{ props.item.calories }}</td>-->
            <!--<td class="text-xs-right">{{ props.item.fat }}</td>-->
            <!--<td class="text-xs-right">{{ props.item.carbs }}</td>-->
            <!--<td class="text-xs-right">{{ props.item.protein }}</td>-->
            <!--<td class="text-xs-right">{{ props.item.sodium }}</td>-->
            <!--<td class="text-xs-right">{{ props.item.calcium }}</td>-->
            <!--<td class="text-xs-right">{{ props.item.iron }}</td>-->
        <!--</template>-->
    </v-data-table>
</template>

<script>
    const csvjson = require('csvjson');
    const csvOptions = {
        delimiter : ',', // optional
        quote     : '"', // optional
    };
    const is = require('is');
    import {parseJson} from '../services/flaten'
   export default {
       props:['data'],
       data() {
           return {
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
//                   {
//                       value: false,
//                       name: 'Lollipop',
//                       calories: 392,
//                       fat: 0.2,
//                       carbs: 98,
//                       protein: 0,
//                       sodium: 38,
//                       calcium: '0%',
//                       iron: '2%'
//                   },
//                   {
//                       value: false,
//                       name: 'Honeycomb',
//                       calories: 408,
//                       fat: 3.2,
//                       carbs: 87,
//                       protein: 6.5,
//                       sodium: 562,
//                       calcium: '0%',
//                       iron: '45%'
//                   }
               ]
           }
       },
       computed:{
           dataFlattened(){
               if (is.object(this.data) || is.array(this.data)) {
                   return csvjson.toObject(parseJson(this.data),csvOptions)
               } else {
                   return undefined
               }
           },
           columns() {
               const columns = []
               if (this.dataFlattened){
                   for (let key in this.dataFlattened[0]) {
                       let col = {text:key,value:key}
                       columns.push(col)
                   }
                   return columns
               } else {
                   return []
               }
           }

       }
   }
</script>

<style>

</style>