<template>
  <div class="pull-right">
    {{formattedDate}}
    <button @click="dec">-</button>
    <button @click="inc">+</button>
  </div>
</template>

<script>
  export default {
    methods: {
      dec(){
        this.$store.commit('setCurrentMonth', this.month - 1 )
      },
      inc(){
        this.$store.commit('setCurrentMonth', this.month + 1 )
      }
    },
    computed:{
      year() {
        return this.$store.state.currentYear
      },
      month () {
        return this.$store.state.currentMonth
      },
      formattedDate() {
        return this.$moment(`${this.year}-${this.month}-1`, 'YYYY-MM-D').format('MMMM YYYY')
      }
    }
  }
</script>
