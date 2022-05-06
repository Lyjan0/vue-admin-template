// 平台属性管理模块请求模块
import request from '@/utils/request';

// 三级联动数据
// 一级分类
// /admin/product/getCategory1   get
export const reqCategory1List = () => request({
  url:'/admin/product/getCategory1',
  method:'get',
});

// 二级分类
// /admin/product/getCategory2/{category1Id} get
export const reqCategory2List = (category1Id) => request({
  url:`/admin/product/getCategory2/${category1Id}`,
  method:'get'
});

// 三级分类
// /admin/product/getCategory3/{category2Id}  get
export const reqCategory3List = (category2Id) => request({
  url:`/admin/product/getCategory3/${category2Id}`,
  method:'get'
});

// 平台属性数据
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get

export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({
  url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method:'get',
});

// 添加或更新属性与属性值
// /admin/product/saveAttrInfo post
export const reqAddOrUpdateAttrInfo = (data) => request({
  url:'/admin/product/saveAttrInfo',
  method:'post',
  data,
});

/* {
  "attrName": "string",  属性名
  "attrValueList": [ 属性名中 属性值,可以有多个,
    {
      "attrId": 0,  每个属性值的id
      "valueName": "string"  每个属性值的名称
    }
  ],
  "categoryId": 0,  category3Id
  "categoryLevel": 3,  三级分类
} */