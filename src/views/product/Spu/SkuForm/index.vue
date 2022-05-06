<template>
  <div class="sku-add">
    <el-form ref="form" label-width="80px" >
      <el-form-item label="SPU名称">
        {{spuName}}
      </el-form-item>

      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="attrInfo.attrName"
            v-for="attrInfo in attrInfoList"
            :key="attrInfo.id"
          >
            <el-select placeholder="请选择" v-model="attrInfo.attrIdAndValueId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attrInfo.id}:${attrValue.id}`"
                v-for="attrValue in attrInfo.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form ref="form" label-width="80px">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
          >
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndsaleAttrValueId">
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table border style="width: 100%" :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope='{row,$index}'>
              <img :src="row.imgUrl" alt="" style="width: 100px;height:100px;">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" v-if="row.isDefault == '0'" @click="changeDefault(row,spuImageList)">设置默认</el-button>
              <el-button type="success" plain size="mini" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sale">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 图片数据
      spuImageList: [],
      // 销售属性
      spuSaleAttrList: [],
      // 平台属性
      attrInfoList: [],

      // 用于收集sku数据
      skuInfo: {
        // 父组件中传过来的数据,在发请求中就可以获取
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 在组件中双向绑定收集的数据
        skuName: "",
        price: 0,
        weight: "",
        // 规格描述
        skuDesc: "",
        // 需要书写代码获取
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   attrName: "string",
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: "string",
          // },
        ],
        // 默认图片
        skuDefaultImg: "",
        // 图片列表
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],

      },
      // spu名称
      spuName:'',

      // 临时收集选种的图片列表
      imageList: [],

    };
  },
  methods: {
    // 初始化数据
    async getData(category1Id, category2Id, spu) {
      // 收集skuInfo数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      // 收集spu名称进行展示
      this.spuName = spu.spuName;

      // 获取图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let list = spuImageResult.data;
        list.forEach(item => {
          item.isDefault = '0';
        });
        this.spuImageList = list;
      }
      // 获取销售属性的数据
      let spuSaleAttrResult = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (spuSaleAttrResult.code == 200) {
        this.spuSaleAttrList = spuSaleAttrResult.data;
      }

      // 获取平台属性数据
      let attrInfoResult = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (attrInfoResult.code == 200) {
        this.attrInfoList = attrInfoResult.data;
      }
    },

    // table多选框回调
    handleSelectionChange(params){
      // params可以获取到用户选中图片的信息,
      // 如果是收集给服务器,还缺少一个isDefault字段(是否为默认图片)
      // 在发请求获取到数据 时候,给每个数据加上isDefault
      this.imageList = params;
    },

    // 点击设置默认回调
    changeDefault(row,arr){
      arr.forEach((item)=>{
        item.isDefault  = '0';
      });
      row.isDefault = '1';

      // skuInfo中有要收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl ;
    },

    // 点击取消通知父组件切换页面
    cancel(){
      this.$emit('changeScene', {scene:0,flag:'取消'});

      // 清除数据
      Object.assign(this._data,this.$options.data());
    },

    // 点击保存按钮的回调
    async sale(){
      const {attrInfoList,skuInfo,spuSaleAttrList,imageList} = this;
      // 整理平台属性 收集在attrInfoList,需要整理到skuInfo中
      let arr = [];
      attrInfoList.forEach((item)=>{
        if(item.attrIdAndValueId){
          // 存在,为选中的属性
          // 拆分解构为要带给服务器的数据
          const [attrId,valueId] = item.attrIdAndValueId.split(':');
          let obj = {attrId,valueId};
          arr.push(obj);
        }
      });
      // 将整理好的平台属性存到skuInfo.skuAttrValueList中
      skuInfo.skuAttrValueList = arr;

      /*
        // 另一种方法
        let result = attrInfoList.reduce((prev,item)=>{
          if(item.attrIdAndValueId){
            // 存在,为选中的属性
            // 拆分解构为要带给服务器的数据
            const [attrId,valueId] = item.attrIdAndValueId.split(':');
            prev.push({attrId,valueId});
          }
          return prev;
        },[])
      */
      // 整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
        if(item.saleAttrIdAndsaleAttrValueId){
          const [saleAttrId,saleAttrValueId] = item.saleAttrIdAndsaleAttrValueId.split(':');
          prev.push({saleAttrId,saleAttrValueId})
        }
        return prev;
      },[]);

      // 整理图片数据
      skuInfo.skuImageList = imageList.map((item)=>{
        return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId: item.id
        }
      });


      // 发请求
      let result = await this.$API.spu.reqAddSku(skuInfo);
      if(result.code == 200){
        this.$message({type:'success',message:"保存sku成功"});
        // 切换回展示页面
        this.$emit('changeScene', {scene:0,flag:'保存'});
      }else{
        this.$message({type:'error',message:"保存sku失败"});
      }
    }
  },
};
</script>

<style>
</style>