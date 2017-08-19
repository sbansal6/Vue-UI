<template>
    <div>
        <div class="row form-group">
            <div class="col-md-1">
                <select v-model="mode" id="select" class="form-control" style="width: 100%">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
                </select>
            </div>
            <div class="col-md-10">
                <input autofocus v-model="url" ref="input" type="text" style="width: 100%" placeholder="http://api.com" class="form-control">
            </div>
            <div class="col-md-1">
                <button class="btn btn-info pull-right" style="width: 100%" v-on:click="onGo" type="button">Go!</button>
            </div>
        </div>
        <div class="form-group">
            <div id="parts" class="col-md-8">
                <div class="row form-group">
                     <ul class="nav nav-pills">
                         <li :class=""><a @click.prevent="" >Query</a></li>
                         <li :class=""><a @click.prevent="">Header</a></li>
                         <li :class=""><a @click.prevent="">Body</a></li>
                     </ul>
                 </div>
                <div id="features" class="row form-group">
                    <ul class="nav nav-pills">
                        <li :class="rawGridClass"><a @click.prevent="rawGridSelected" >Raw</a></li>
                        <li :class="flatGridClass"><a @click.prevent="flatGridSelected">Flat</a></li>
                        <li :class=""><a @click.prevent="">Sql</a></li>
                        <li :class=""><a @click.prevent="">Charts</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-4">
                <div class="row form-group">
                    <table class="table table-bordered">
                        <tbody>
                        <tr>
                            <td>Status</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>StatusText</td>
                            <td>Ok</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <raw-grid :data="data" v-if="rawGrid"></raw-grid>
        <table-grid :data="data" v-if="flatGrid"></table-grid>
    </div>

</template>

<script>
    import RawGrid from '../components/RawGrid.vue'
    import TableGrid from '../components/TableGrid.vue'
    import Spinner from 'vue-simple-spinner'
    import taffy from '../services/taffy'
    import axios from 'axios'

    /**
     * ApiForm Screen.
     * Can have multiple instances of screen, directly proportional to tab
     */
    export default {
        data : function(){
            return {
                request:{
                    url : "",
                },
                response:{
                    status: undefined,
                    statusText: undefined,
                    data:undefined
                },
                url : "",
                data: "",
                status: undefined,
                statusText: undefined,
                show: false,
                features: {

                },
                mode:'GET'
            }
        },
        methods : {
            onGo:function () {
                const self  = this;
                if(this.url.length > 0){
                    taffy.go(this.mode,this.url,null,{})
                        .then(
                            function(response){
                                self.status = response.status
                                self.statusText = response.statusText
                                self.data = JSON.stringify(response.data,null,4)
                            }
                        )
                        .catch(function(error){
                                self.text = JSON.stringify(error.response.data,null,4)
                                self.status = JSON.stringify(error.response.status)
                                self.statusText = JSON.stringify(error.response.statusText)
                        })
                }
            },
            rawGridSelected:function(){
                this.$store.commit('setGridRaw')
            },
            flatGridSelected:function(){
                this.$store.commit('setGridFlat')
            },
            feature: {
                rawSelected:function(){

                },
                flatSelected: function(){

                },
                sqlSelected: function(){

                },
                chartSelected: function(){

                }
            }
        },
        computed :{
            data() {
                this.data
            },
            formattedStatus() {
                 if (this.status && this.statusText){
                    return `${this.status} ${this.statusText}`
                }

            },
            rawGrid(){
                return this.$store.state.grid.raw
            },
            flatGrid(){
                return this.$store.state.grid.flat
            },
            rawGridClass() {
                return {
                    active:this.$store.state.grid.raw
                }
            },
            flatGridClass(){
                return {
                    active:this.$store.state.grid.flat
                }
            }
        },
        components :{
            RawGrid,TableGrid,Spinner
        },
        mounted(){
            this.$refs.input.focus();
        }

    }
</script>

<style>

</style>
