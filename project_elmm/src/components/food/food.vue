<template>
  <transition name="showFood" v-if="currentFood">
    <div class="food" v-show="foodShow">
      <div class="imgWrapper">
        <img :src="currentFood.image" :alt="currentFood.name">
        <div class="goback" @click="hideFood">
          <i class="icon icon-arrow_lift"></i>
        </div>
      </div>
      <div class="baseInfo">
        <div class="name">{{ currentFood.name }}</div>
        <div class="desc">
          月售{{ currentFood.sellCount }}份
          <span>好评</span>
          {{ currentFood.rating }}%
        </div>
        <div class="priceWrapper">
          <div class="price">￥{{ currentFood.price }}</div>
          <!-- <transition name="control" mode="out-in"> -->
          <div class="right">
            <transition-group mode="out-in" name="control">
              <div
                key="1"
                class="addCar"
                v-show="!currentFood.count"
                @click="incrementFood(currentFood)"
              >加入购物车</div>
              <!-- 控制器 -->
              <cartControl
                key="2"
                class="foodControl"
                :food="currentFood"
                v-show="currentFood.count"
              />
            </transition-group>
          </div>
          <!-- </transition> -->
        </div>
      </div>
      <div class="main"></div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import cartControl from "components/common/cart-control/cartControl.vue";
export default {
  methods: {
    incrementFood(food) {
      if (!food.count) {
        this.$set(food, "count", 1);
      } else {
        food.count++;
      }
      this.ballEvent();
    },
    hideFood() {
      this.showFoodOperation("hide");
    },
    ...mapMutations(["showFoodOperation", "ballEvent"])
  },
  computed: {
    ...mapState(["foodShow", "currentFood"])
  },
  components: {
    cartControl
  }
};
</script>

<style lang="stylus" scoped>
// 详情动画
.showFood-enter-active, .showFood-leave-active {
  transition: all 0.4s;
  transform: translate3d(0, 0, 0);
}

.showFood-enter, .showFood-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

// 控制器动画
.control-enter-active, .control-leave-active {
  transition: opacity 0.3s;
}

.control-enter, .control-leave-active {
  opacity: 0;
}

.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  width: 100%;
  z-index: 100;
  background: #fff;

  .imgWrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background: #ddd;

    img {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      vertical-align: top;
    }

    .icon {
      position: absolute;
      z-index: 2;
      top: 10px;
      padding: 10px;
      font-size: 20px;
      color: #fff;
    }
  }

  .baseInfo {
    padding: 18px;

    .name {
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: #07111b;
    }

    .desc {
      font-size: 10px;
      color: #93999f;
      margin-bottom: 18px;

      span {
        margin-left: 12px;
      }
    }

    .priceWrapper {
      display: flex;
      justify-content: space-between;
      line-height: 20px;

      .price {
        font-size: 14px;
        color: #f01414;
      }

      .right {
        position: relative;

        .addCar {
          position: absolute;
          right: 0px;
          bottom: 0px;
          width: 70px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 10px;
          color: #fff;
          background: #00a0dc;
          border-radius: 12px;
        }

        .foodControl {
          width: 70px;
        }
      }
    }
  }
}
</style>
