import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

// 小球儿生成
const BALL_LEN = 10;

function ballsCreated() {
  let ret = [];
  for (let i = BALL_LEN; i > 0; i--) {
    ret.push({
      show: false,
      el: null
    })
  }
  return ret;
}


export default new Vuex.Store({
  state: {
    seller: {},
    goods: [],
    ratings: [],
    cartListShow: false, //  购物车列表展示
    balls2: ballsCreated(), //  小球
    dropBalls2: [], // 保存下落小球
    foodShow: false, // food详情层的显示与否
    currentFood: {}, //  当前需要查看的food详情

  },
  mutations: {
    //  初始设置seller,goods,ratings数据
    setSellerData(state, data) {
      state.seller = data
    },
    setGoodsData(state, data) {
      state.goods = data
    },
    setRatingsData(state, data) {
      state.ratings = data
    },
    // 改变购物车蒙层
    changeCartListShow(state) {
      state.cartListShow = !state.cartListShow
    },
    //  小球事件相关
    ballEvent(state) {
      //   console.log('eventTarget', event.path[0]) // 获取事件源对象
      for (let i = 0; i < state.balls2.length; i++) {
        const ball2 = state.balls2[i];
        if (!ball2.show) {
          ball2.show = true;
          ball2.el = event.path[0];
          state.dropBalls2.push(ball2);
          break;
        }
      }
    },
    dropBalls2Shift(state, el) {
      const ball2 = state.dropBalls2.shift()
      if (ball2) {
        ball2.show = false
        el.style.display = 'none'
      }
    },
    //  清除购物车
    clearShopCart(state) {
      state.goods.forEach(goods => {
        goods.foods.forEach(food => {
          if (food.count) {
            food.count = 0
          }
        })
      })
      if (state.cartListShow) {
        state.cartListShow = false;
      }
    },
    //  商品详情
    showFoodOperation(state, params) {
      if (params.type === 'show') {
        state.foodShow = true
        state.currentFood = params.data
      } else {
        state.foodShow = false
        state.currentFood = {}
      }
    }
  },
  getters: {
    //   计算被选择商品数组对象
    selectGoods(state) {
      let ret = [];
      state.goods.forEach(goods => {
        goods.foods.forEach(food => {
          if (food.count) {
            ret.push(food)
          }
        })
      })
      if (!ret.length) {
        if (state.cartListShow) {
          state.cartListShow = false
        }
      }
      return ret
    }
  }
})
