<template>
    <div class="row form-group">
        <div class="col-md-12">
            <codemirror style="min-height:500px !important; box-sizing: border-box" v-model="rawData" :options="editorOptions"></codemirror>
        </div>
    </div>
</template>

<script>
    import { codemirror, CodeMirror } from 'vue-codemirror'
    export default {
        props:['data'],
        data() {
            return {
                editorOptions: {
                    // codemirror options
                    tabSize: 4,
                    mode: 'text/javascript',
                    theme: 'Base16-Light',
                    lineNumbers: true,
                    line: true,
                    readOnly:true

                }
            }
        },
        computed: {
           rawData(){
               return JSON.stringify(this.data,null,4)
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