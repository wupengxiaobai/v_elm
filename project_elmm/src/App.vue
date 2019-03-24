<template>
  <div id="app">
    <!-- <h1>{{ msg }}</h1>
    <a href="#">◆ 从这里开始 ◆</a>-->
    <v-header :sellerData="sellerData" class="headerWrapper"></v-header>
    <v-tab class="tabWrapper" :tabs="tabs" :initialIndex="0"></v-tab>
  </div>
</template>

<script>
import vHeader from "components/common/header/header";
import vTab from "components/tab/tab";
import { getSeller } from "api";

import Goods from "components/goods/goods";
import Seller from "components/seller/seller";
import Ratings from "components/ratings/ratings";
export default {
  name: "app",
  data() {
    return {
      //   msg: "我的vue实战 饿了么商家"
      sellerData: {}
    };
  },
  methods: {
    // 获取 seller 数据
    /* getSellerData() {
      this.$axios.get("/api/seller").then(
        res => {
          if (res.status === 200 && res.data) {
            this.sellerData = res.data.data;
          }
        },
        err => {
          console.log(err);
        }
      );
    } */
    _getSeller() {
      getSeller().then(seller => {
        this.sellerData = seller;
      });
    }
  },
  components: {
    vHeader,
    vTab
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
</style>
