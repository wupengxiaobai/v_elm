<template>
  <transition name="coveMove">
    <div class="cart-list-wrapper" v-show="cartListShow">
      <div class="blackCover" @click="hideCover"></div>
      <div class="main">
        <div class="top">
          <div class="left">购物车</div>
          <div class="right" @click="clearShopCar">清空</div>
        </div>
        <div class="list-wrapper">
          <cube-scroll
            ref="scroll"
            :options="coverOptions"
            :data="selectGoods"
            v-if="selectGoods.length"
          >
            <ul class="good-list">
              <li
                class="good-item border-bottom-1px"
                v-for="(food,index) in selectGoods"
                :key="index"
              >
                <div class="left">
                  <div class="name">{{ food.name }}</div>
                  <div class="price">￥{{ food.count * food.price}}</div>
                </div>
                <div class="right">
                  <cartControl :food="food"/>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import cartControl from "components/common/cart-control/cartControl.vue";
export default {
  data() {
    return {
      coverOptions: {
        click: true,
        directionLockThreshold: 0
      }
    };
  },
  computed: {
    ...mapState(["cartListShow"]),
    ...mapGetters(["selectGoods"])
  },
  methods: {
    hideCover() {
      this.changeCartListShow();
    },
    //   清除购物车
    clearShopCar() {
      this.clearShopCart();
    },
    //   重新渲染scroll组件
    refreshScroll() {
      if (this.cartListShow) {
        this.$nextTick(() => {
          this.$refs.scroll && this.$refs.scroll.refresh();
        });
      }
    },
    ...mapMutations(["clearShopCart", "changeCartListShow"])
  },
  watch: {
    cartListShow() {
      this.refreshScroll();
    }
  },
  components: {
    cartControl
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/base.styl';
@import 'common/stylus/variable.styl';

.coveMove-enter-active, .coveMove-leave-active {
  transition: all 0.5s;

  .main {
    transition: all 0.3s;
  }
}

.coveMove-enter, .coveMove-leave-active {
  opacity: 0;

  .main {
    transform: translate3d(0, 100%, 0);
  }
}

.cart-list-wrapper {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 48px;
  z-index: 200;
  display: flex;

  .blackCover {
    flex: 1;
    background: rgba(0, 0, 0, 0.4);
  }

  .main {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #fff;

    .top {
      padding: 0 18px;
      height: 40px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;

      .right {
        color: $color-blue;
        font-size: 12px;
      }
    }

    .good-list {
      padding: 0 18px;
      display: flex;
      flex-direction: column;

      .good-item {
        height: 48px;
        display: flex;
        align-items: center;

        .left {
          flex: 1;
          display: flex;
          justify-content: space-between;

          .name {
          }

          .price {
          }
        }

        .right {
          flex: 0 0 100px;
          display: flex;
          align-items: center;
        }
      }
    }

    .list-wrapper {
      &>>>.cube-scroll-wrapper {
        // height: 100%;
        max-height: 200px;
      }
    }
  }
}
</style>
