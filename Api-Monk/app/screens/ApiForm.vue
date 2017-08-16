<template>
    <div>
        <div class="row form-group">
            <div class="col-md-1">
                <select id="select" class="form-control" style="width: 100%">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
                </select>
            </div>
            <div class="col-md-10">
                <input v-model="url" type="text" style="width: 100%" placeholder="http://api.com" class="form-control">
            </div>
            <div class="col-md-1">
                <button class="btn btn-info pull-right" style="width: 100%" v-on:click="onGo" type="button">Go!</button>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-8">
                <ul class="nav nav-pills">
                    <li class="active"><a @click.prevent="rawGridSelected" >Raw</a></li>
                    <li><a @click.prevent="flatGridSelected">Flat</a></li>
                </ul>
            </div>
            <div class="col-md-4">
                {{formattedStatus}}
                <!--<button type="button" style="" class="btn btn-primary pull-right">Status <span class="badge">200</span></button>-->
            </div>
        </div>
        <raw-grid v-if="rawGrid"></raw-grid>
        <table-grid v-if="flatGrid"></table-grid>
    </div>
</template>

<script>
    import axios from 'axios'
    import RawGrid from '../components/RawGrid.vue'
    import TableGrid from '../components/TableGrid.vue'

    export default {
        data : function(){
            return {
                url : "",
                text: "",
                status: undefined,
                statusText: undefined
            }
        },
        methods : {
            onGo:function () {
                const self  = this;
                if(this.url.length > 0){
                    axios.get(this.url)
                            .then(function (response) {
                                console.log(JSON.stringify(response))
                                self.$store.commit('setApiResponse',response)
                                self.status = response.status
                                self.statusText = response.statusText
                                self.text = JSON.stringify(response.data,null,4)
                            })
                            .catch(function (error) {
                                console.log('onGo error',error)
//                              self.text = JSON.stringify(error.response.data,null,4)
//                              self.status = JSON.stringify(error.response.status)
//                              self.statusText = JSON.stringify(error.response.statusText)
                            });
                }
            },
            rawGridSelected:function(){
                this.$store.commit('setGridRaw')
            },
            flatGridSelected:function(){
                this.$store.commit('setGridFlat')
            }
        },
        computed :{
            formattedStatus() {
                console.log('values',this.$store.state.apiResponse.status,this.$store.state.apiResponse.statusText)
                if (this.status && this.statusText){
                    return `${this.status} ${this.statusText}`
                }

            },
            rawGrid(){
                return this.$store.state.grid.raw
            },
            flatGrid(){
                return this.$store.state.grid.flat
            }
        },
        components :{
            RawGrid,TableGrid
        }

    }
</script>

<style>

</style>
