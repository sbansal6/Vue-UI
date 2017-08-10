<template>
 <div>
   <breadcrumb>
     <div slot="breadcrumb-slot">
       <current-month></current-month>
     </div>
   </breadcrumb>
   <div id="day-bar">
     <div>Mon</div>
     <div>Tue</div>
     <div>Wed</div>
     <div>Thu</div>
     <div>Fri</div>
     <div>Sat</div>
     <div>Sun</div>
   </div>
   <div id="calendar" class="animated fadeIn">
     <div v-for="week in weeks" class="calendar-week">
       <calendar-day v-for="day in week" :day="day" :key="day.id"> </calendar-day>
     </div>
   </div>
 </div>
</template>

<script>
  import Breadcrumb from '../components/Breadcrumb.vue'
  import CurrentMonth from '../components/CurrentMonth.vue'
  import CalendarDay from '../components/CalendarDay.vue'

  export default {
    created () {

    },
    computed: {
      year() {
        return this.$store.state.currentYear
      },
      month () {
        return this.$store.state.currentMonth
      },
      days () {

        const SUNDAY = 0
        const MONDAY = 1

        // generating all days in current month
        let days = [];
        let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D')
        do {
          days.push(currentDay)
          currentDay = this.$moment(currentDay).add(1,'days')
        } while ((currentDay.month() + 1) === this.month)

        // Add previous days to start
        currentDay = this.$moment(days[0])
        if (currentDay.day() !== MONDAY){
          do {
            currentDay = this.$moment(currentDay).subtract(1,'days')
            days.unshift(currentDay)
          } while (currentDay.day() !== MONDAY)
        }

        // Add following days to start
        currentDay = this.$moment(days[0])
        if (currentDay.day() !== SUNDAY) {
          currentDay = this.$moment(days[days.length - 1])
          do {
            currentDay = this.$moment(currentDay).add(1,'days')
            days.push(currentDay)
          } while (currentDay.day() !== SUNDAY)
        }

        return days
      },
      weeks () {
        let weeks = []
        let week = []
        for (let day of this.days) {
          week.push(day)
          if (week.length == 7) {
            weeks.push(week)
            week = []
          }
        }
        return weeks

      }
    },
    components :{
      CalendarDay, CurrentMonth, Breadcrumb
    }
  }
</script>
