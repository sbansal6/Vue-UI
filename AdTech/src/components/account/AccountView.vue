<template>
    <div class="col-md-12">
    <h1 class="text">Linked Accounts
        <span>
            <router-link v-bind:to="{name:'newaccount'}">
               <a href="" class="btn btn-xs btn-success">
                <span class="glyphicon glyphicon-plus-sign"></span>
            </a>
            </router-link>

        </span>
    </h1>
    <account-list></account-list>
</div>
</template>

<script>
    import AccountList from './AccountList.vue';
    export default {
        components: {
           AccountList
        },
        data: function(){
            return {
                accounts : [
                    {
                        name: 'www01',
                        status: 'success',
                        icon: 'globe',
                        description: 'Web server that runs our sites'
                    } ,
                    {
                        name: 'www01',
                        status: 'success',
                        icon: 'globe',
                        description: 'Web server that runs our sites'
                    }
                ]

            }
        }
    }
</script>

