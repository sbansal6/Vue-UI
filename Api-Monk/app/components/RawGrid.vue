<template>
    <div class="row form-group">
        <div class="col-md-12">
            <textarea readonly style="min-height:500px !important; box-sizing: border-box" v-model="rawResponseData" placeholder="response here" class="form-control"  id="comment"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            rawResponseData() {
                return JSON.stringify(this.$store.state.apiResponse.rawResponseData,null,4)
            }
        }
    }
</script>