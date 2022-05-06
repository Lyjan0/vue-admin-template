// 统一暴露接口
import * as trademark from './product/tradeMark';
import * as sku from './product/sku';
import * as spu from './product/spu';
import * as attr from './product/attr';

// 对外暴露
export default {
  trademark,
  sku,
  spu,
  attr
}