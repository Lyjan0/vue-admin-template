// spu获取数据模块

import request from '@/utils/request';

// 获取spu数据
// /admin/product/{page}/{limit} get
export const reqSpuList = (page,limit,category3Id) => request({
  url:`/admin/product/${page}/${limit}`,
  method:'get',
  params:{category3Id}
});

// 组件SpuForm
// 获取某一个spu信息
// /admin/product/getSpuById/{spuId} get
export const reqSpuById = (spuId) => request({
  url:`/admin/product/getSpuById/${spuId}`,
  method:'get'
});

// 获取品牌信息
// /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () => request({
  url:'/admin/product/baseTrademark/getTrademarkList',
  method:'get'
});

// 获取SPU图片
// /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) => request({
  url:`/admin/product/spuImageList/${spuId}`,
  method:'get'
});

// 获取平台全部销售属性（最多只有三个）
// /admin/product/baseSaleAttrList get
export const reqBaseSaleAttrList = () => request({
  url:"/admin/product/baseSaleAttrList",
  method:'get'
});

// 修改||添加spu：两者携带的参数区别在于修改的要多一个id
export const reqAddOrUpdateSpu = (spuInfo) => {
  if(spuInfo.id){
    // 修改
    // /admin/product/updateSpuInfo post
    return request({
      url:'/admin/product/updateSpuInfo',
      method:'post',
      data:spuInfo
    });
  }else{
    // 添加
    // /admin/product/saveSpuInfo post
    return request({
      url:'/admin/product/saveSpuInfo',
      method:'post',
      data:spuInfo
    });
  }
};

// 删除spu
//  /admin/product/deleteSpu/{spuId} delete
export const reqDeleteSpu = (spuId) => request({
  url:`/admin/product/deleteSpu/${spuId}`,
  method:'delete'
});



// 获取图片
// /admin/product/spuImageList/{spuId}
// get
// export const reqSpuImageList = (spuId) => request({
//   url:`/admin/product/spuImageList/${spuId}`,
//   method:'get'
// });

// 获取销售属性
// /admin/product/spuSaleAttrList/{spuId}
// get
export const reqSpuSaleAttrList = (spuId) => request({
  url:`/admin/product/spuSaleAttrList/${spuId}`,
  method:'get'
});


// 获取平台属性的数据
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
// get
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({
  url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method:'get'
});

// 添加sku
// /admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo) => request({
  url:'/admin/product/saveSkuInfo',
  method:'post',
  data:skuInfo,
});


// 获取spu的所有sku属性
// /admin/product/findBySpuId/{spuId} get
export const reqSkuList = (spuId) => request({
  url:`/admin/product/findBySpuId/${spuId}`,
  method:'get',
});

