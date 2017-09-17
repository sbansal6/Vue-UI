<template>
    <codemirror v-model="rawData" :options="editorOptions"></codemirror>

</template>

<script>
    import { codemirror, CodeMirror,  } from 'vue-codemirror'
    require("codemirror/addon/hint/show-hint.css")
    require("codemirror/addon/hint/show-hint.js")
    require('codemirror/addon/hint/sql-hint.js')
    export default {
        props:['response'],
        data() {
            return {
                editorOptions: {
                    mode: 'text/x-sql',
                    theme: 'base16-dark',
                    lineNumbers: true,
                    line: true,
                    autofocus:true,
                    extraKeys: {"Ctrl-Space": "autocomplete"},
                    hint: CodeMirror.hint.sql,
                    hintOptions: {
                        tables: {
                            "table1": [ "col_A", "col_B", "col_C" ],
                            "table2": [ "other_columns1", "other_columns2" ]
                        }
                    }
                }
            }
        },
        computed: {
            rawData(){
                let startingValue= ""
                for (var i = 0; i < 5; i++) {
                    startingValue += '\n';clea
                }
                return startingValue

            }
        },
        components :{
            codemirror
        }
    }
</script>

<style>

</style>