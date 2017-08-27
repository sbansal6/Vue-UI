<template>
    <div>
        <bootstrap-modal ref="theModal" :needHeader="false" :needFooter="false" size="large">
            <div slot="title">
                Your title here
            </div>
            <div slot="body">
                Your body here
            </div>
            <div slot="footer">
                Your footer here
            </div>
        </bootstrap-modal>
        ...
    </div>
</template>

<script>
    const bootstrapModal = require('vue2-bootstrap-modal')
    require('bootstrap-loader')
    export default {
        components :{
            'bootstrap-modal': bootstrapModal
        }

    }

</script>
