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
                        <li :class=""><a @click.prevent="openTheModal()"><span class="glyphicon glyphicon-cog"></span></a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-4">
                <div class="row form-group">
                    <table class="table table-bordered">
                        <tbody>
                        <tr>
                            <td>Status</td>
                            <td>{{status}}</td>
                        </tr>
                        <tr>
                            <td>StatusText</td>
                            <td>{{statusText}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <raw-grid :data="data" v-if="rawGrid"></raw-grid>
        <table-grid :data="data" v-if="flatGrid"></table-grid>
        <setting></setting>

    </div>

</template>

<script>
    import RawGrid from '../components/RawGrid.vue'
    import TableGrid from '../components/TableGrid.vue'
    import Setting from '../components/Setting.vue'
    import Spinner from 'vue-simple-spinner'
    import taffy from '../services/taffy'
    import axios from 'axios'
//    const sql = require('sql.js');
//    var db = new sql.Database();

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
                data: undefined,
                status: undefined,
                statusText: undefined,
                show: false,
                features: {

                },
                mode:'GET',
                showModal: true,
                settingState:true
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
                                self.data = response.data
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
            openTheModal:function(){
                this.$modal.show('hello-world');
            }
        },
        computed :{
            rawData() {
                return this.data
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
            RawGrid,TableGrid,Spinner,Setting
        },
        mounted(){
            this.$refs.input.focus();
        }

    }
</script>

<style>

</style>
