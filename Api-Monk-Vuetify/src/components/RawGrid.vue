<!--Displays Raw text response from api-->
<!--** if api response content type is json then convert it into json-->

<template>
    <codemirror style="min-height:500px !important; box-sizing: border-box" v-model="rawData" :options="editorOptions"></codemirror>
</template>

<script>
  import { codemirror, CodeMirror } from 'vue-codemirror'
  export default {
      props:['response'],
      data() {
          return {
              editorOptions: {
                  // codemirror options
                  //tabSize: 4,
                  //mode: 'text/javascript',
                  theme: 'base16-dark',
                  lineNumbers: true,
                  line: true,
                  readOnly:true

              }
          }
      },
      computed: {
          rawData(){
              if (this.response){
                  if(this.response.headers["content-type"].includes('json')){
                      return JSON.stringify(this.response.data,null,2)
                  } else {
                      return this.response.data
                  }
              }
          }
      },
      components :{
          codemirror
      }
  }
</script>

<style>
    .CodeMirror {
        border: 1px solid #eee;
        min-height: 600px;
        max-height: 600px;
    }
</style>