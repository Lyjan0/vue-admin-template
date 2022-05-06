<template>

  <div class="spu-add-edit">
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tradeMark.tmName"
            :value="tradeMark.id"
            v-for="tradeMark in tradeMarkList"
            :key="tradeMark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option
            :label="unSelect.name"
            :value="`${unSelect.id}:${unSelect.name}`"
            v-for="unSelect in unSelectAttr"
            :key="unSelect.id"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList" >
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>

          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope={row,$index}>
              <!-- @close="handleClose(tag)" -->
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
                >
                {{tag.saleAttrValueName}}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
                @keyup.enter.native="$event.target.blur()"
              >
              </el-input>
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope='{row,$index}'>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      // 照片墙图片预览的回调中的数据
      // 图片的url
      dialogImageUrl: "",
      // 对话框的显示或隐藏
      dialogVisible: false,

      // spu信息
      /*
        spu属性初始化的时候是一个空对象，在修改spu的时候，会向服务器发请求，
        获取到spu属性，在修改的时候，可以利用服务器返回这个对象收集最新的数据
        提交级服务器，

        但在添加spu时，初始化时并不用发请求，那添加的spu要收集到哪？以及收集的
        字段有哪些？要看文档，如下就是添加时的spu
      */
      spu: {
        // 三级分类id
        category3Id: 0,
        // spu描述
        description: "",
        // spuid
        id: 0,
        // spu图片列表
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        // spu名称
        spuName: "",
        // 平台销售属性
        spuSaleAttrList: [
        ],
        // 平台属性的id
        tmId: '',
      },
      // 品牌信息
      tradeMarkList: [],
      // spu图片
      spuImageList: [],
      // 平台全部销售属性
      saleAttrList: [],

      // 未选择的平台销售属性id
      attrIdAndAttrName: '',
    };
  },
  methods: {
    // 照片墙删除图片的时候的回调
    handleRemove(file, fileList) {
      // file当前删除的图片，fileLIst剩余的图片列表
      // console.log(file, fileList);
      // el的照片墙的组件中是需要name和url字段的，而带给服务器的数据是不需要这两个字段的
      this.spuImageList = fileList;
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 照片墙上传成功的钩子
    handlerSuccess(response, file, fileList){
      this.spuImageList = fileList;
    },

    // 初始化SpuForm数据
    async initSpuData(spu) {
      // 发请求获取数据
      // spu 信息
      let spuResult = await this.$API.spu.reqSpuById(spu.id);
      if (spuResult.code == 200) {
        // 存储数据到spu
        this.spu = spuResult.data;
      } else {
        console.log(spuResult.code, spuResult.data);
      }
      // 品牌信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        // 存储数据
        this.tradeMarkList = tradeMarkResult.data;
      } else {
        console.log(tradeMarkResult.code, tradeMarkResult.data);
      }

      // spu图片
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        // 存储数据
        // 由于el元素中要求的图片列表中的属性是name和url，
        // 所以将获取到的数据处理一下
        let listArr =spuImageResult.data;
        listArr.forEach((item)=>{
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
      } else {
        console.log(spuImageResult.code, spuImageResult.data);
      }

      // 平台全部售卖属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        //存储数据
        this.saleAttrList = saleResult.data;
      } else {
        console.log(saleResult.code, saleResult.data);
      }
    },
    // 添加新的销售属性
    addSaleAttr(){
      // attrIdAndAttrName已经收集到的id和name：id:name
      // 拆分
      const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':');
      // console.log(baseSaleAttrId,saleAttrName);
      // 收集到spu.spuSaleAttrList
      /*
        {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "string",
                saleAttrName: "string",
                saleAttrValueName: "string",
                spuId: 0,
              },
            ],
          },
      */
      // 整理数据
      let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]};
      // 添加到pu.spuSaleAttrList
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 清除在select上显示的属性
      this.attrIdAndAttrName = '';
    },
    // 点击添加切换为input的回调
    showInput(row){
      // 添加控制切换的字段row.inputVisible"
      this.$set(row,'inputVisible',true);
      // 添加收集数据的字段row.inputValue
      this.$set(row,'inputValue','');
      // 切换后，自动聚焦
      this.$nextTick(()=>{
        this.$refs.saveTagInput.focus();
      })
    },
    // input失去焦点后执行的回调
    handleInputConfirm(row){
      // row解构出baseSaleAttrId,saleAttrValueName(tag展示的数据)
      const {baseSaleAttrId,inputValue} = row;
      // 处理不合理的新增属性（重复、为空）
      if(inputValue.trim() == ''){
        this.$message('属性值不能为空');
        return;
      };
      // 重复为false
      let isFlag = row.spuSaleAttrValueList.every((item)=>{
        return item.saleAttrValueName!=inputValue
      }
      );
      if(!isFlag){
        this.$message('属性值不能重复');
        return;
      }

      // 整理数据，添加到spuSaleAttrValueList中（baseSaleAttrId、saleAttrValueName）
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue};
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      // 切换回button
      row.inputVisible = false;
    },
    // 保存按钮的回调
    async addOrUdateSpu(){
      // 整理参数(缺照片墙的数据)
      // 照片墙的数据放在了 spuImageList中，
      // spu中的照片墙需要带imageName与imageUrl字段，
      // 整合
      this.spu.spuImageList = this.spuImageList.map((item)=>{
        return {
          imageName: item.name,
          // 新增的图
          // tem.response.data服务器上url
          // item.url 这是旧图的
          imageUrl: (item.response&&item.response.data) || item.url,
        }
      });

      // 发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if(result.code == 200){
        // 成功，返回到展示页面，以及提示修改成功
        this.$message({type:'success',message:'修改成功'});
        this.$emit('changeScene', {scene:0,flag:this.spu.id?'修改':'添加'});
      }else{
        this.$message({type:'error',message:'修改失败'});
      }
      // 清理数据
      Object.assign(this._data,this.$options.data());

    },

    // 添加SPU方法
    async addSpuData(category3Id){
      // 添加spu的时候收集三级分类id
      this.spu.category3Id = category3Id;
      // 品牌信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        // 存储数据
        this.tradeMarkList = tradeMarkResult.data;
      } else {
        console.log(tradeMarkResult.code, tradeMarkResult.data);
      };

      // 平台全部售卖属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        //存储数据
        this.saleAttrList = saleResult.data;
      } else {
        console.log(saleResult.code, saleResult.data);
      };
    },
    // 取消按钮
    cancel(){
      this.$emit('changeScene', {scene:0,flag:'取消'});
      // 清理数据this._data响应式数据，this.$options配置对象data、mouned。。。this.$options.data()就是原始的数据
      Object.assign(this._data,this.$options.data());
    }


  },
  computed:{
    // 计算出还未选择的销售属性
    unSelectAttr(){
      // 全部的平台属性有3个 saleAttrList
      // 每个spu都有自己的属性（全部属性中的，数量不定）spu.spuSageAttrList
      // 数组过滤
      let result = this.saleAttrList.filter((item)=>{
        return this.spu.spuSaleAttrList.every((item1)=>{
          // 所以不符合才为true
          return item.name != item1.saleAttrName;
        })
      })

      return result;
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>