<template>
  <div id="app">
    <v-header :sellerData="sellerData" class="headerWrapper"></v-header>
    <!-- <v-tab class="tabWrapper" :tabs="tabs" :initialIndex="0"></v-tab> -->
    <v-tabBar :tabBarData="tabBarData"></v-tabBar>
    <transition name="rv" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- 商品详情层 -->
    <foodCover/>
    <!-- 购物车弹出层 -->
    <cartListCover/>
  </div>
</template>

<script>
import foodCover from "components/food/food.vue";
import cartListCover from "components/shop-cart/cartListCover.vue";
import vHeader from "components/common/header/header";
// import vTab from "components/tab/tab";
import vTabBar from "components/tabBar/tabBar.vue";
import { getSeller, getGoods, getRatings } from "api";

import Goods from "components/goods/goods";
import Seller from "components/seller/seller";
import Ratings from "components/ratings/ratings";
import { mapMutations } from "vuex";
export default {
  name: "app",
  data() {
    return {
      sellerData: {},
      tabBarData: [
        {
          to: "/goods",
          label: "商品"
        },
        {
          to: "/ratings",
          label: "评论"
        },
        {
          to: "/seller",
          label: "商家"
        }
      ]
    };
  },
  methods: {
    _getSeller() {
      getSeller().then(seller => {
        this.sellerData = seller;
        this.setSellerData(seller);
      });
    },
    _getGoods() {
      getGoods().then(goods => {
        this.setGoodsData(goods);
      });
    },
    _getRatings() {
      getRatings().then(ratings => {
        this.setRatingsData(ratings);
      });
    },
    ...mapMutations(["setSellerData", "setGoodsData", "setRatingsData"])
  },
  watch: {},
  components: {
    vHeader,
    // vTab,
    vTabBar,
    foodCover,
    cartListCover
  },
  computed: {
    //   传递给 tab 组件的数据
    tabs() {
      return [
        {
          label: "商品",
          component: Goods,
          data: {
            seller: this.sellerData
          }
        },
        {
          label: "评价",
          component: Ratings,
          data: {
            seller: this.sellerData
          }
        },
        {
          label: "商家",
          component: Seller,
          data: {
            seller: this.sellerData
          }
        }
      ];
    }
  },
  created() {
    // this.getSellerData();
    this._getSeller();
    this._getGoods();
    this._getRatings();
  }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .tabWrapper {
    flex: 1;
    // height: calc(100% - 134px);
  }
}

.rv-enter-active,
.rv-leave-active {
  transition: all 0.3s;
  transform: translate3d(0, 0, 0);
}

.rv-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.rv-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
