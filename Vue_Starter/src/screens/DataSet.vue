<template>
  <div id="api-form">
    <div class="input-group" style="margin-top: 10px">
      <select id="select">
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>
      <input v-model="url" type="text" placeholder="http://api.com" class="form-control">
      <span class="input-group-btn">
        <button class="btn btn-info" v-on:click="onGo" style="margin-left: 2px" type="button">Go!</button>
   </span>
    </div>
    <div style="margin-top: 10px">
      <ul class="nav nav-tabs">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Messages</a></li>
      </ul>
      <div class="pull-right">
        {{formattedStatus}}
      </div>
      <textarea style="width: 100%; min-height:500px !important; box-sizing: border-box" v-model="text" placeholder="response here" class="form-control" rows="5" id="comment"></textarea>
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
