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
        if (this.month === 1) {
          this.$store.commit('setCurrentYear', this.year - 1 )
          this.$store.commit('setCurrentMonth', 12 )
        } else {
          this.$store.commit('setCurrentMonth', this.month - 1 )
        }

      },
      inc(){
        if (this.month === 12) {
          this.$store.commit('setCurrentYear', this.year + 1 )
          this.$store.commit('setCurrentMonth', 1 )
        } else {
          this.$store.commit('setCurrentMonth', this.month + 1 )
        }
      }
    },
    computed: {
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
