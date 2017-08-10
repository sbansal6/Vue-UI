<template>
  <div>
    <ol>
      <slot name="breadcrumb-slot">
      </slot>
    </ol>
  </div>

</template>

<script>
export default {
  props: {},
  methods: {
    isLast (index) {
      return index === this.list.length - 1
    },
    showName (item) {
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label
      }
      if (item.name) {
        item = item.name
      }
      return item
    }
  }
}
</script>
