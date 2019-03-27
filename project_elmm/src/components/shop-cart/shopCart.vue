<template>
  <div class="shop-cart" @click="toggleCartList">
    <div class="left">
      <div class="car" :class="{'hasShop':totalCount>0}">
        <i class="icon-shopping_cart"></i>
        <div class="num" v-if="totalCount">{{ totalCount }}</div>
      </div>
      <div class="price">￥{{ totalPrice }}</div>
      <div class="middle">{{ deliveryPrice }}</div>
    </div>
    <div class="right" :class="{'canPay':totalPrice>=seller.minPrice}">￥{{ seller.minPrice }}元起送</div>
    <!-- 小球控制器 -->
    <div class="ball-container">
      <div v-for="(ball,index) in balls2" :key="index">
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 列表蒙层 -->
    <!-- <cartListCover/> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

const BALL_LEN = 10;
const innerClsHook = "inner-hook";

/* function createBalls() {
  let ret = [];
  for (let i = 0; i < BALL_LEN; i++) {
    ret.push({
      show: false
    });
  }
  return ret;
} */

export default {
  data() {
    return {
      /* balls: createBalls() */
    };
  },
  methods: {
    toggleCartList() {
      // 如果有商品执行显示
      if (this.selectGoods.length) {
        this.changeCartListShow();
      }
    },
    /* drop(el) {
      //   console.log(el);
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    }, */
    beforeDrop(el) {
      //  拿到最后一个下落小球
      /* const ball = this.dropBalls[this.dropBalls.length - 1];
      const rect = ball.el.getBoundingClientRect();
      //   console.log(rect);
      const x = rect.left - 32;
      const y = -(window.innerHeight - rect.top - 22);
      el.style.display = "";
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      const inner = el.getElementsByClassName(innerClsHook)[0];
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`; */

      //vuex drop
      const ball2 = this.dropBalls2[this.dropBalls2.length - 1];
      const rect2 = ball2.el.getBoundingClientRect();
      const x2 = rect2.left - 32;
      const y2 = -(window.innerHeight - rect2.top - 22);
      el.style.display = "";
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y2}px,0)`;
      const inner = el.getElementsByClassName(innerClsHook)[0];
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x2}px,0,0)`;
    },
    dropping(el, done) {
      this._reflow = document.body.offsetHeight;
      el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`;
      const inner = el.getElementsByClassName(innerClsHook)[0];
      inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`;
      el.addEventListener("transitionend", done);
    },
    afterDrop(el) {
      /* const ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      } */

      // vuex drop
      this.dropBalls2Shift(el);
    },
    ...mapMutations(["changeCartListShow", "dropBalls2Shift"])
  },
  created() {
    //   保存下落小球的数组
    this.dropBalls = [];
  },
  computed: {
    totalCount() {
      let totalCount = 0;
      this.selectGoods.forEach(good => {
        totalCount += good.count;
      });
      return totalCount;
    },
    totalPrice() {
      let totalPrice = 0;
      this.selectGoods.forEach(good => {
        totalPrice += good.price * good.count;
      });
      return totalPrice;
    },
    deliveryPrice() {
      if (this.totalPrice < 88) {
        return `另需配送费￥${this.seller.deliveryPrice}元`;
      } else {
        return `满${"xx"}元, 免配送费`;
      }
    },
    ...mapState(["seller", "balls2", "dropBalls2"]),
    ...mapGetters(["selectGoods"])
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/variable.styl';
@import 'common/stylus/base.styl';

.shop-cart {
  color: $color-shopCart;
  background: $color-background-shopCart;
  display: flex;
  align-items: center;
  z-index: 9999;
  position: relative;

  .left {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    height: 48px;

    .car {
      position: absolute;
      z-index: 999;
      width: 56px;
      height: 56px;
      top: -10px;
      left: 12px;
      font-size: 24px;
      background: #2b343c;
      border: 7px solid $color-background-shopCart;
      border-radius: 50%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;

      .num {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background: #f01414;
        -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
      }

      &.hasShop {
        color: #fff;
        background: #00a0dc;
      }
    }

    .price {
      margin-left: 72px;
      margin-right: 8px;
      font-size: 16px;
      font-weight: 700;
      padding: 0 8px;
      border-right: 1px solid $color-shopCart;
    }

    .middle {
      font-size: 10px;
    }
  }

  .right {
    flex: 0 0 105px;
    height: 48px;
    background: #2b333b;
    text-align: center;
    line-height: 48px;
    font-size: 12px;

    &.canPay {
      background: #00b43c;
      color: #fff;
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 99999999;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $color-blue;
        transition: all 0.4s linear;
      }
    }
  }
}
</style>
