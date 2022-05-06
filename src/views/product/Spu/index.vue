<template>
  <div class="sku-container">
    <!-- 三级分类 -->
    <el-card style="margin-bottom: 20px">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!=0" />
    </el-card>
    <!-- 属性展示区 -->
    <el-card>
      <div class="spu-info" v-show="scene == 0">
        <!-- spu添加按钮 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <!-- spu展示table -->
        <el-table border style="width: 100%" :data="records">
          <!-- 第一列 -->
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <!-- 第二列 -->
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <!-- 第三列 -->
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <!-- 第四列 -->
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope='{row,$index}'>
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加spu" @click="addSku(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu的全部spu列表" @click="handler(row)"></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>

              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器
        @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
        <el-pagination
          style="textAlign:center;"
          :current-page="page"
          :page-sizes="[3,5,7]"
          :page-size="limit"
          layout=" prev, pager, next, jumper ,->, total, sizes"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"/>
      <SkuForm v-show="scene == 2" @changeScene="changeScene" ref="sku"/>

      <!-- sku列表对话框 -->
      <el-dialog
        :title="`${spu.spuName}的sku列表`"
        :visible.sync="dialogTableVisible"
        :before-close="handleClose"
      >
        <el-table
          :data="skuList"
          border
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            prop="skuName"
            label="名称"
            width="width"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="width"
          >
          </el-table-column>
          <el-table-column
            prop="weight"
            label="重量"
            width="width"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="默认图片"
            width="width"
          >
            <template slot-scope='{row,$index}'>
              <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SkuForm from './SkuForm';
import SpuForm from './SpuForm';
export default {
  name: "Spu",
  components:{SkuForm,SpuForm},
  data() {
    return {
      // 三级分类id
      category1Id: "",
      category2Id: "",
      category3Id: "",

      // table显示与隐藏
      // isShowTable: true,

      // 分页器
      // 默认位置
      page: 1,
      // 每页展示3条
      limit: 3,
      // 总数量
      total: 10,

      // records:spu列表数据
      records:[],
      // 控制展示区的展示内容 0：展示spu数据，1：添加||修改spu，2：添加sku
      scene: 0,
      // 控制对话框的显示与隐藏
      dialogTableVisible: false,
      // 保存当前点击的spu信息(对话框要用)
      spu: {},
      // skuList
      skuList: [],
      // loading效果
      loading: true
    };
  },
  methods: {
    // 获取Spu列表数据
    async getSpuList(){
      // 解构所需的数据
      let {page,limit,category3Id} = this;
      //发请求获取数据
      let result = await this.$API.spu.reqSpuList(page,limit,category3Id);
      // console.log(result);
      if(result.code == 200){
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    // 从子组件中获取三级分类的ID
    getCategoryId({ categoryId, level }) {
      // categoryId: id,level: 分类
      switch (level) {
        case 1:
          this.category1Id = categoryId;
          // 清除上一次的二级和三级分类
          this.category2Id = "";
          this.category3Id = "";
          // 清除上一次的平台属性
          this.attrList = [];
          break;
        case 2:
          this.category2Id = categoryId;
          // 清除上一次的三级分类
          this.category3Id = "";
          // 清除上一次的平台属性
          this.attrList = [];
          break;
        case 3:
          this.category3Id = categoryId;
          // 三级分类的id都有了,发请求获取属性
          this.getSpuList();
          break;
      }
    },

    // 点击分页器页码事件回调
    handleCurrentChange(page){
      // 修改当前页
      this.page = page;
      // 重新发请求展示
      this.getSpuList();
    },
    // 分页器每页数量事件回调
    handleSizeChange(limit){
      // 修改每页数量
      this.limit = limit;
      // 回到第一页
      this.page = 1;
      // 重新发请求获取数据展示
      this.getSpuList();
    },
    // 点击添加spu按钮的回调
    addSpu(){
      // 切换到SpuForm组件
      this.scene = 1;
      // 通知spu子组件发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 点击edit（修改按钮）的回调
    updateSpu(row){
      // 切换到SpuForm组件
      this.scene = 1;
      // 让子组件（SpuForm）发请求
      this.$refs.spu.initSpuData(row);

    },

    // 子组件点击取消，修改scene，回到展示页面
    changeScene({scene,flag}){
      this.scene = scene;
      if(flag=='修改'){
        // 重新发请求
        this.getSpuList();
      }else if(flag=='添加'){
        // 回到第一页，
        this.page = 1;
        // 重新发请求
        this.getSpuList();
      }

    },

    // 点击删除按钮的回调
    async deleteSpu(row){
      // console.log(row);
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if(result.code = 200){
        // 提示信息
        this.$message({type:'success',message:'删除成功'});
        // 判断当前页数据是否还有

        this.page = this.records.length > 1 ? this.page : this.page -1;
        // 重新发请求获取数据展示
        this.getSpuList();
      }else{
        this.$message({type:'error',message:'删除失败'});
      }
    },

    // 点击添加Sku按钮的回调
    addSku(row){
      // 切换到添加Sku
      this.scene = 2;
      // 调用子组件的方法,发请求
      this.$refs.sku.getData(this.category1Id,this.category2Id,row);
    },
    // 点击查看sku列表的回调
    async handler(row){
      this.spu = row;
      // 显示
      this.dialogTableVisible = true;

      // 获取sku列表进行展示
      let result = await this.$API.spu.reqSkuList(row.id);
      if(result.code == 200){
        this.skuList = result.data;
        // 清除loading效果
        this.loading = false;
      }else{
        console.log(result.data);
      }

    },

    // 对话框关闭前的回调
    handleClose(done){
      // 开启loading效果
      this.loading = true;
      // 清除数据(解决回显的问题)
      this.skuList = [];
      // 关闭对话框
      done();
    }

  },
};
</script>

<style>
</style>