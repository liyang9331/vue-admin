<template>
  <div class="dashboard-container">
    <alarmData />
  </div>
</template>

<script>
import alarmData from './components/alarmData.vue'
export default {
  name: 'Dashboard',
  data() {
    return {
     
    }
  },
  components: {
    alarmData
  },
  methods: {
  }
}

</script>

<style lang="scss" scoped>
</style>
