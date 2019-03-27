import {
  get
} from './helpers'

// 获取商家数据方法
const getSeller = get('/api/seller')
const getGoods = get('/api/goods')
const getRatings = get('/api/ratings')

export {
  getSeller,
  getGoods,
  getRatings
}
