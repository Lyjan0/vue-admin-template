<template>
  <div class="dashboard-container">
   <Card />
   <Sale />
   <Observe />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './Card';
import Sale from './Sale';
import Observe from './Observe';
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components:{Card,Sale,Observe}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
