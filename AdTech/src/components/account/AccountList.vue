<template>
        <section class="content">
            <div class="row">
               <account-item></account-item>
            </div>
        </section>
</template>

<script>
    import AccountItem from './AccountItem.vue'
    export default {
        name:'account-list',
        component:{
           AccountItem
        }
    }
</script>