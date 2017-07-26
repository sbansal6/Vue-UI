<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="'/dashboard'" class="nav-link"><i class="icon-speedometer"></i> Dashboard </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="'/accounts'" class="nav-link"><i class="icon-speedometer"></i> Accounts </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="'/datasets'" class="nav-link"><i class="icon-speedometer"></i> DataSets </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="'/studio'" class="nav-link"><i class="icon-speedometer"></i> Studio </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>

export default {
  name: 'sidebar',
  methods: {
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
</style>
