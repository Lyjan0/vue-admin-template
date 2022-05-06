<template>
  <div class="observe-container">
    <el-row :gutter="10">
      <el-col :span="12">
        <Search />
      </el-col>
      <el-col :span="12">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Category from './Category';
import Search from './Search';
export default {
  name:'Observe',
  components:{
    Category,
    Search
  }
}
</script>

<style>
.observe-container{
  margin-top: 20px;
}
</style>