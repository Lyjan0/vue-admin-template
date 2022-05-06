<template>
  <div class="category-select">
    <el-form :inline="true" class="demo-form-inline" :model="categoryForm">
    <el-form-item label="一级分类">
      <el-select  placeholder="请选择" v-model='categoryForm.category1Id' @change="handler1" :disabled="show">
        <el-option
          :label="category1.name"
          :value="category1.id"
          v-for="category1 in category1List"
          :key="category1.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select  placeholder="请选择" v-model='categoryForm.category2Id' @change="handler2" :disabled="show">
        <el-option
          :label="category2.name"
          :value="category2.id"
          v-for="category2 in category2List"
          :key="category2.id"
        ></el-option>

      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select  placeholder="请选择" v-model='categoryForm.category3Id' @change="handler3" :disabled="show">
        <el-option
          :label="category3.name"
          :value="category3.id"
          v-for="category3 in category3List"
          :key="category3.id"
        ></el-option>

      </el-select>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name:'CategorySelect',
  props:['show'],
  data(){
    return {
      // 一级分类数据
      category1List:[],
      // 二级分类数据
      category2List: [],
      // 三级分类数据
      category3List: [],
      // 收集相应的一级二级三级id
      categoryForm:{
        category1Id:'',
        category2Id:'',
        category3Id:'',
      }
    }
  },
  mounted(){
    // 组件挂载完成,向服务器发请求,获取相应的一级分类的数据
    this.getCategory1List();
  },
  methods:{
    // 获取一级分类数据
    async getCategory1List(){
      let result = await this.$API.attr.reqCategory1List();
      // console.log(result);
      if(result.code == 200){
        this.category1List = result.data;
        return 'ok';
      }else{
        console.log(result.code,result.data);  //debug

      }
    },

    // 一级分类发生变化,获取二级分类
    async handler1(){
      // 每次改变先清除前一次的数据
      this.category2List = [];
      this.category3List = [];
      this.categoryForm.category2Id = '';
      this.categoryForm.category3Id = '';
      // 解构一级分类ID
      let {category1Id} = this.categoryForm;
      // 给父组件传递id
      this.$emit('getCategoryId',{categoryId:category1Id,level: 1});

      // 发请求获取二级分类的数据
      let result = await this.$API.attr.reqCategory2List(category1Id);
      // console.log(result);
      if(result.code == 200){
        this.category2List = result.data;
        return 'ok';
      }
    },
    // 二级分类发生变化,获取三级分类
    async handler2(){
      // 每次变化时先清除上一次的数据
      this.category3List = [];
      this.categoryForm.category3Id = '';
      // 解构id
      let {category2Id} = this.categoryForm;
      // 给父组件传递id
      this.$emit('getCategoryId',{categoryId:category2Id,level: 2});
      let result  = await this.$API.attr.reqCategory3List(category2Id);
      if(result.code == 200){
        this.category3List = result.data;
        return 'ok';
      }
    },

    // 三级分类发生变化回调
    handler3(){
      // 解构id
      let {category3Id} = this.categoryForm;
      // 给父组件传递id
      this.$emit('getCategoryId',{categoryId:category3Id,level: 3});
    }
  }
}
</script>

<style>

</style>