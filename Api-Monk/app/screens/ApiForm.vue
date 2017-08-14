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
                    <li class="active"><a href="#">Raw</a></li>
                    <li><a href="#">Flat</a></li>
                </ul>
            </div>
            <div class="col-md-4">
                <button type="button" style="" class="btn btn-primary pull-right">Status <span class="badge">200</span></button>
            </div>

        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <textarea style="min-height:500px !important; box-sizing: border-box" v-model="text" placeholder="response here" class="form-control"  id="comment"></textarea>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
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
                                self.status = response.status
                                self.statusText = response.statusText
                                self.text = JSON.stringify(response.data,null,4).toString()
                            })
                            .catch(function (error) {
                                console.log(JSON.stringify(error))
                                self.text = JSON.stringify(error.response.data,null,4)
                                self.status = JSON.stringify(error.response.status)
                                self.statusText = JSON.stringify(error.response.statusText)
                            });
                }
            }
        },
        computed :{
            formattedStatus() {
                if (this.status && this.statusText){
                    return `${this.status} ${this.statusText}`
                }

            }
        }

    }
</script>

<style>

</style>
