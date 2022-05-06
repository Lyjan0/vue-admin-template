<template>
  <div class="trade-mark">
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 10px"
      @click="showDialog"
      >添加</el-button
    >
    <!--
      表格组件
      data：表格组件将来需要展示的数据（为数组类型）
      数据展示是以一列为标准的
    -->
    <el-table style="width: 100%" border :data="list">
      <!-- 每列：一共四列 -->
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <!-- 使用作用域插槽 -->
        <template v-slot="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" @click="deleteTradeMart(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      分页器
      :current-page：当前第几页、
      :total：数据全部条数、
      :page-size：每一页展示条数、
      :page-sizes：可以设置每一页展示多少条数据
      pager-count:按钮数量，中间为5，那就7，中间为7，那就9
      layout：分页器布局  layout="total, sizes，prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    -->
    <el-pagination
      style="margin-top: 10px; textAlign: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper,->,total, sizes"
    >
    </el-pagination>

    <!-- 添加的对话框 -->
    <!--
      :visible.sync:控制对话框显示与隐藏
     -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌' " :visible.sync="dialogFormVisible">
      <!-- form表单 :model属性，这个属性的作用是把表单的数据收集到那个对象，并且在进行表单验证的时候，也是根据这个属性来操作的  -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <!-- :label-width="formLabelWidth" -->
        <!-- 品牌名称 -->
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <!-- 品牌名称结束 -->

        <!-- 品牌LOGO -->
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--
            :on-success:可以检测到图片上传成功，当图片上传成功会执行一次
            :before-upload：在上传图片之前会执行一次
          -->
          <!--
            这里的不是表单元素，不能使用v-model收集数据
            里面的个action：可以在这里设置图片的上传地址，
            -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      // 默认在第一页
      page: 1,
      // 每页展示的条数
      limit: 3,

      // 总共数据数量
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示与隐藏属性
      dialogFormVisible: false,
      // 上传图片使用的属性
      // imageUrl: "",
      // 收集品牌信息
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // 对话框title
      // title:'',
      // 表单验证规则'
      rules:{
        tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          ],
        logoUrl: [
            { required: true, message: '请选择品牌LOGO'},
          ],
      }
    };
  },
  mounted() {
    //获取列表数据方法
    this.getPageLIst();

  },
  methods: {
    // 获取品牌列表的数据
    async getPageLIst() {
      // 解构参数
      const { page, limit } = this;
      // 获取 品牌列表的接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      // console.log(result);
      if (result.code == 200) {
        // 存储数据
        this.total = result.data.total;
        this.list = result.data.records;
        return "ok";
      } else {
        console.log(result.code, result.message); // debug

      }

    },

    // 分页器点击页码跳转,
    handleCurrentChange(page) {
      // 修改参数
      this.page = page;
      // 重新发请求
      this.getPageLIst();
    },
    // 每一页展示的数量变化的时候触发
    handleSizeChange(limit) {
      // 修改参数
      this.limit = limit;
      // 重新发请求
      this.getPageLIst();
    },

    // 点击展示对话框
    showDialog() {
      // this.title = '添加品牌';
      this.dialogFormVisible = true;
      // 清除上一次上传的图片
      this.tmForm = {tmName:'',logoUrl:''};
    },
    // 点击修改某一个品牌
    updateTradeMark(row) {
      // this.title = '修改品牌';
      this.dialogFormVisible = true;
      // console.log(row);

      // 将已有的品牌信息赋值给tmForm进行展示
      // 将服务器返回的品牌信息,直接赋值给了tmForm进行展示,
      // 也就是tmForm存储为服务器返回品牌信息,两个信息进行了一个绑定,就算点击取消,也会更改,所以这里使用...操作符进行拷贝
      this.tmForm = {...row};
    },

    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // res：上传成功之后返回给前端的数据，有图片在服务器的地址
      // file也是上传成功之后返回的数据
      // 下面有存储了图片地址，可以不要此操作
      // this.imageUrl = URL.createObjectURL(file.raw);

      // 进行数据收集
      this.tmForm.logoUrl = res.data;
    },

    // 图片上传之前
     beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    // 点击确定上传或修改
     addOrUpdateTradeMark(){
      // 校验通过之后才能添加或修改
      this.$refs.ruleForm.validate(async(valid) => {
        if(valid){
          // 全部通过
          // 隐藏对话框
          this.dialogFormVisible = false;
          // 发请求
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm);
          if(result.code == 200){
            // 弹出信息:添加品牌成功||修改品牌成功
            this.$message({
              message:this.tmForm.id?'修改品牌成功':'添加品牌成功',
              type:'success',
            });
            // 添加或修改后需要重新发请求,获取品牌列表进行展示
            this.getPageLIst();
          }
        }else{
          // 失败
          console.log('error submit!!');
          return false;
        }
      })

    },


    // 点击删除品牌信息
    deleteTradeMart(row){
      let {tmName,id} = row;
      // console.log(tmName,id);
      this.$confirm(`你确定要删除${tmName}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        // 点击确定
        let isFlag = this.list>2?true:false;
        let result =  await this.$API.trademark.reqRemoveTradeMark(id);
        if(result.code == 200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 判断当前页面是否还有数据
          this.page = isFlag?this.page:this.page-1;

          this.getPageLIst();

        }

      }).catch(() => {
        // 点击取消
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
};
</script>

<style>
/* element-ui图片上传的样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>