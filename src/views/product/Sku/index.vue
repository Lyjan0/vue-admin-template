<template>
  <div class="sku-container">
    <el-table
      :data="records"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="width">
      </el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width">
      </el-table-column>
      <el-table-column
        style="textAlign:center"
        prop="prop"
        label="默认图片"
        width="110">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width:80px;height:80px;">
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(KG)"
        width="80">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="width">
        <template slot-scope='{row,$index}'>
          <el-button
            type="success"
            icon="el-icon-top"
            size="mini"
            v-if="row.isSale == '1'"
            @click="cancelSale(row)"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-bottom"
            size="mini"
            v-else
            @click="sale(row)"
          ></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="showSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      style="textAlign:center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total">
    </el-pagination>

    <!-- 抽屉效果 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :show-close="false"
      size="50%"
      v-loading="loading"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="attr in skuInfo.skuAttrValueList"
              :key="attr.id"
              style="margin-right:10px;"
            >{{attr.attrId}}--{{attr.valueId}}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="200px" style="width:200px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" style="width:100%;height:100%;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name:'Sku',
  data(){
    return {
      // 当前页码
      page: 1,
      // 一页展示的数据
      limit: 10,
      // 总页面
      total: 0,
      // 请求回来的skuList数据
      records: [],

      // 详情展示的sku列表数据
      skuInfo: {},

      // 控制抽屉的显示与隐藏
      drawer: false,

      // 抽屉出来的方向
      direction: 'rtl',
      // loading
      loading: true,
    }
  },
  mounted(){
    // 挂载完获取列表数据
    this.getSkuList();
  },
  methods:{
    // 发请求方法
    async getSkuList(){
      let result = await this.$API.sku.reqSkuList(this.page,this.limit);
      if(result.code == 200){
        // 总数据条数
        this.total = result.data.total;
        // 数据列表
        this.records = result.data.records;
      }
    },
    // 分页器点击页码切换的回调
    handleCurrentChange(page){
      // console.log(page);
      // 更新当前页
      this.page = page;
      // 发请求获取新数据展示
      this.getSkuList();

    },
    handleSizeChange(limit){
      // 每页展示的数据条数
      this.limit = limit;
      // 重新获取数据展示
      this.getSkuList();
    },
    // 上架操作
    async sale(row){
      let result = await this.$API.sku.reqSale(row.id);
      if(result.code == 200){
        row.isSale = 1;
        this.$message({type:"success",message:"上架成功"});
      }
    },
    // 下架操作

    async cancelSale(row){
      let result = await this.$API.sku.reqCancelSale(row.id);
      if(result.code == 200){
        row.isSale = 0;
        this.$message({type:"success",message:"上架成功"});
      }
    },

    // edit回调
    edit(){
      this.$message({type:'info',message:'该功能正在开发中'})
    },

    // info:sku详情展示回调
    async showSkuInfo(row){
      // 通过抽屉展示数据
      this.drawer = true;
      // 获取sku的数据
      let result = await this.$API.sku.reqSkuById(row.id);
      if(result.code == 200){
        this.skuInfo = result.data;
      };
    },


  }
}
</script>

<style scoped>
.el-row .el-col-5{
  font-size: 18px;
  text-align: right;
}
.el-col{
  margin: 10px 10px;
}
</style>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button{
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
  }
</style>