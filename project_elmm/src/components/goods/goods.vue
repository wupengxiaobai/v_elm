<template>
  <div class="goods">
    <div class="goods-wrapper">
      <cube-scroll-nav
        @change="changeHandler"
        @sticky-change="stickyChangeHandler"
        :side="true"
        :data="goodsData"
        :current="current"
        :options="scrollOptions"
        v-if="goodsData.length"
      >
        <template slot="bar" slot-scope="props">
          <!-- :txts="props.txts" -->
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :current="props.current"
            :txts="barTxts"
          >
            <template slot-scope="props">
              <div class="text">
                <supportIco v-if="props.txt.type>=1" :size="1" :type="props.txt.type"/>
                <span>{{ props.txt.name }}</span>
                <span class="count" v-if="props.txt.count">{{ props.txt.count }}</span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>

        <cube-scroll-nav-panel
          v-for="item in goodsData"
          :key="item.name"
          :label="item.name"
          :title="item.name"
        >
          <ul>
            <li
              class="item"
              v-for="(food,foodIndex) in item.foods"
              :key="foodIndex"
              @click="showFood(food)"
            >
              <div class="img">
                <img :src="food.image" alt>
              </div>
              <div class="desc">
                <div class="name">{{ food.name }}</div>
                <div class="other text-ov" v-if="food.description">{{ food.description }}</div>
                <div class="count">
                  月售{{ food.sellCount }}份
                  <span>好评率 {{ food.rating }}%</span>
                </div>
                <div class="price">￥{{ food.price }}</div>
              </div>
              <!-- 购物控制按钮  @add="onAdd"  -->
              <CartControl :food="food"/>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <!-- 购物车模块 -->
    <ShopCart ref="shopCart" :seller="sellerData" class="shop-cart"/>
  </div>
</template>

<script>
// import { getGoods, getSeller } from "api";
import ShopCart from "components/shop-cart/shopCart.vue";
import CartControl from "components/common/cart-control/cartControl.vue";
import supportIco from "components/common/support-ico/support-ico.vue";
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      //   goodsData: [],
      //   sellerData: {},
      scrollOptions: {
        // click: false,
        directionLockThreshold: 0
      },
      current: "热销榜"
    };
  },
  methods: {
    showFood(food) {
      this.showFoodOperation({ type: "show", data: food });
    },
    /* onAdd(el) {
      // 触发购物车(子组件)的drop事件,进行drop动画
      this.$refs.shopCart.drop(el);
    }, */
    changeHandler(label) {},
    stickyChangeHandler(current) {},
    ...mapMutations(["showFoodOperation"])
  },
  computed: {
    barTxts() {
      let ret = [];
      this.goods.forEach(good => {
        const { type, name, foods } = good;
        let count = 0;
        foods.forEach(food => {
          count += food.count || 0;
        });
        ret.push({
          type,
          name,
          count
        });
      });

      return ret;
    },
    goodsData() {
      return this.goods;
    },
    sellerData() {
      return this.seller;
    },
    ...mapState(["goods", "seller"])
  },
  components: {
    ShopCart,
    CartControl,
    supportIco
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/variable.styl';
@import 'common/stylus/base.styl';

.goods {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &>>>.goods-wrapper {
    height: calc(100% - 48px);

    .item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      position: relative;
      dispaly: flex;

      .img {
        flex: 0 0 57px;
        width: 57px;
        height: 57px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .desc {
        flex: 1;
        margin-left: 6px;
        max-width: 200px;

        .name {
          font-size: 14px;
          margin: 2px 0 4px 0;
        }

        .other {
          font-size: 10px;
          color: #93999f;
          line-height: 12px;
          margin-bottom: 4px;
        }

        .count {
          font-size: 10px;
          color: #93999f;

          span {
            margin-left: 6px;
          }
        }

        .price {
          margin-top: 4px;
          font-weight: bold;
          color: $color-red;
        }
      }

      &::after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        content: ' ';
      }

      &:nth-last-of-type(1) {
        padding-bottom: 9px;

        &::after {
          border: none;
        }
      }
    }
  }

  &>>> .shop-cart {
    height: 48px;
  }

  & >>> .cube-scroll-nav-bar-item {
    position: relative;
    padding: 0 12px;
    width: 80px;
    height: 54px;
    line-height: 1.2;
    text-align: justify;
    display: flex;
    align-items: center;
    white-space: pre-wrap;
    box-sizing: border-box;
    background: #f3f5f7;
    color: #333;

    .text {
      font-size: 12px;

      .count {
        position: absolute;
        right: 5px;
        bottom: 5px;
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        font-size: 10px;
        color: #fff;
        background: $color-blue;
        border-radius: 50%;
      }
    }
  }

  & >>>.cube-scroll-nav-bar-item_active {
    background: #fff;
    color: #333;
  }

  & >>>.cube-scroll-nav .cube-sticky-content {
    height: auto;
  }

  &>>> .cube-scroll-nav-panel-title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: #93999f;
    background: #f3f5f7;
  }

  &>>>.cube-sticky {
    height: auto;
  }
}
</style>
