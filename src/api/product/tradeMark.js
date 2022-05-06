// 品牌数据管理
import request from '@/utils/request';
// /admin/product/baseTrademark/{page}/{limit} get
// 获取品牌列表数据
export const reqTradeMarkList = (page,limit) => request({
  url:`/admin/product/baseTrademark/${page}/${limit}`,
  method:'get'
});

// 添加品牌
// /admin/product/baseTrademark/save
// post 参数：品牌名称和LOGO，（id的由服务器生成）
// export const reqBaseTradeMark = (data) => request({
//   url:'/admin/product/baseTrademark/save',
//   data,
//   method:'post',
// });

// 修改品牌
// /admin/product/baseTrademark/update
// put 参数：根据id修改，带上修改后的品牌名称和LOGO
// export const reqUpdateTradeMark = (data) => request({
//   url:'/admin/product/baseTrademark/update',
//   data,
//   method:'put',
// });

// 两个请求差不多，可以合并为一个请求函数
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 带有id，为修改
  if(tradeMark.id){
    return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark});
  }else{
    // 不带id，为添加
    return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark});
  }
};

// 删除品牌信息
// /admin/product/baseTrademark/remove/{id}
export const reqRemoveTradeMark = (id) => request({
  url:`/admin/product/baseTrademark/remove/${id}`,
  method:'delete'
});
