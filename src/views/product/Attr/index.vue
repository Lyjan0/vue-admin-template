<template>
  <div class="attr">
    <!-- 三级分类 -->
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"/>
    </el-card>
    <!-- 平台属性 -->
    <el-card>
      <div class="table-container" v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格展示属性 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性值列表"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                style="margin: 0 5px"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性 -->
      <div class="addAttr" v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span v-else @click="toEdit(row,$index)" style="display: block">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="prop"
            label="操作"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="AddOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1" >保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      // 三级分类id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 平台属性
      attrList: [],
      // table显示与隐藏
      isShowTable: true,

      // 新增||修改属性
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    // 获取分类id的自定义事件回调
    getCategoryId({ categoryId, level }) {
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
          this.getAttrList();
          break;
      }
    },
    // 发请求获取数据
    async getAttrList() {
      // 解构id
      const { category1Id, category2Id, category3Id } = this;
      // 发请求
      let result = await this.$API.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
        return "ok";
      }
    },
    // 添加属性的回调
    addAttr() {
      this.isShowTable = false;
      // 每次进来的时候先清空上一次留下的数据
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id, // 这里可以收集三级分类id了
        categoryLevel: 3,
      };
    },

    // 修改属性的回调
    updateAttr(row) {
      // 修改属性页面的显示与隐藏
      this.isShowTable = false;
      // const {attrName,attrValueList} = row;
      // this.attrInfo = {
      //   attrName,
      //   attrValueList,
      //   categoryId: 0,
      //   categoryLevel: 3,
      // };

      // 涉及到拷贝问题,点击取消的时候,数据还是会改变,所以要用到深拷贝
      // 使用 lodash中的深拷贝
      this.attrInfo = cloneDeep(row);
      // 为其添加上flag标志,以到达查看与编辑模式的切换
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item,'flag',false);
      })
    },

    // 添加属性值回调
    addAttrValue() {
      // 解构attrValueList
      let { attrValueList } = this.attrInfo;
      // if(attrValueList.length < 1){
      //   // 没有数据时
      //  attrValueList.push({attrId:0});
      // }else{
      //   // 有数据时
      //   attrValueList.push({attrId:attrValueList.length});
      // }
      // flag 控制是修改还是查看模式
      attrValueList.push({ attrId: this.attrInfo.id, flag: true });

      this.$nextTick(()=>{
        this.$refs[this.attrInfo.attrValueList.length-1].focus();
      });
    },
    // 对flag进行修改,以及对用户输入进行检查
    toLook(row){
      if(row.valueName == undefined){
        this.$message('请你输入一个正常的属性值');
        return;
      } else if(row.valueName.trim() == ''){
        this.$message('请你输入一个正常的属性值');
        return;
      }

      // if(row.valueName.trim() == ''){
      //   this.$message('请你输入一个正常的属性值');
      //   return;
      // }

      // 对输入的属性值进行判断,是否和已有的值相同
      let isRepat = this.attrInfo.attrValueList.some(item => {
        // 将row从数组判断中去除
        if(row !== item){
          return row.valueName == item.valueName;
        }
      });

      if(isRepat){
        this.$message('输入的值已存在,请输入其他值');
        return;
      }
      // 让input消失,sapn显示
      row.flag = false;
    },

    // 点击span,显示input的回调
    toEdit(row,index){
      // 修改flag
      row.flag = true;
      // 实现input自动聚焦
      this.$nextTick(()=>{
        this.$refs[index].focus();
      });

    },

    // 气泡确认框确认按钮的回调
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index,1);
    },

    // 保存按钮,添加或修改
    async AddOrUpdateAttr(){
      // 整理参数:1.去掉用于判断查看||编辑的flag,2.去掉添加的属性为空的数据
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter((item)=> {
        // 属性值不为空
        if(item.valueName != ''){
          // 删除flag
          delete item.flag;
          return true;
        }
      });

      // 发请求添加或修改
      try {
        await this.$API.attr.reqAddOrUpdateAttrInfo(this.attrInfo);
        // 成功,信息提示
        this.$message({type:"success",message:'保存成功'});
        // 重新发请求获取数据展示
        this.getAttrList();
        // 切换到属性展示
        this.isShowTable = true;

      } catch (error) {
        // 输出失败信息
        console.log(error.message);
      }
    }
  },

};
</script>

<style>
</style>