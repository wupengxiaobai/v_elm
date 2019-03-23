<template>
  <div id="app">
    <!-- <h1>{{ msg }}</h1>
    <a href="#">◆ 从这里开始 ◆</a>-->
    <v-header :sellerData="sellerData"></v-header>
  </div>
</template>

<script>
import vHeader from "components/common/header/header";
export default {
  name: "app",
  data() {
    return {
      //   msg: "我的vue实战 饿了么商家"
      sellerData: {}
    };
  },
  methods: {
    getSellerData() {
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
    }
  },
  components: {
    vHeader
  },
  created() {
    this.getSellerData();
  }
};
</script>

<style lang="less">
/* #app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  h1 {
    font-size: 32px;
    font-weight: bold;
  }
  a {
    font-size: 22px;
    &:hover {
      text-decoration: underline;
    }
  }
} */
</style>
