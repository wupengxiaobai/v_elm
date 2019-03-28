<template>
  <transition name="showFood" v-if="currentFood">
    <div class="food" v-show="foodShow">
      <cube-scroll ref="scroll" v-if="foodShow">
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
          </div>
        </div>
        <interspace v-if="currentFood.info"/>
        <div class="info" v-if="currentFood.info">
          <div class="title">商品信息</div>
          <div class="cont">{{ currentFood.info }}</div>
        </div>
        <interspace/>
        <div class="ratings">
          <div class="title">商品评价</div>
          <div class="content">
            <ratingsTabOnly
              :allRatingsLen="allRatings.length"
              :recommendRatingsLen="recommendRatings.length"
              :tcRatingsLen="tcRatings.length"
            ></ratingsTabOnly>
          </div>
        </div>
        <ul class="ratings-list">
          <li
            class="ratings-item"
            :class="{'border-bottom-1px':ratingsIndex!=selectRatings(ratingsTabIndex).length-1}"
            v-for="(ratings,ratingsIndex) in selectRatings(ratingsTabIndex)"
            :key="ratingsIndex"
          >
            <div class="top">
              <div
                class="time"
              >{{ dateFormatDate(new Date(ratings.rateTime),'yyyy-MM-dd hh:mm:ss') }}</div>
              <div class="name-warpper">
                <div class="name">{{ ratings.username }}</div>
                <div class="avatar">
                  <img :src="ratings.avatar" alt="头像">
                </div>
              </div>
            </div>
            <div class="bottom">
              <span :class="ratings.rateType==0?'icon-thumb_up':'icon-thumb_down'"></span>
              <div class="rating-content">{{ ratings.text }}</div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { dateFormatDate } from "common/js/tools";
import cartControl from "components/common/cart-control/cartControl.vue";
import interspace from "components/common/interspace/interspace.vue";
import ratingsTabOnly from "components/common/ratingstabonly/ratingsTabOnly.vue";
export default {
  methods: {
    dateFormatDate(date, fmt) {
      return dateFormatDate(date, fmt);
    },
    selectRatings(type) {
      if (type == 0) {
        return !this.onlyShowTextRatings
          ? this.allRatings
          : this.allRatings.filter(item => item.text);
      } else if (type == 1) {
        return !this.onlyShowTextRatings
          ? this.recommendRatings
          : this.recommendRatings.filter(item => item.text);
      } else if (type == 2) {
        return !this.onlyShowTextRatings
          ? this.tcRatings
          : this.tcRatings.filter(item => item.text);
      }
    },
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
    //   重新渲染scroll组件
    refreshScroll() {
      if (this.foodShow) {
        this.$nextTick(() => {
          this.$refs.scroll && this.$refs.scroll.refresh();
        });
      }
    },
    ...mapMutations(["showFoodOperation", "ballEvent"])
  },
  computed: {
    allRatings() {
      return this.currentFood.ratings;
    },
    recommendRatings() {
      return this.currentFood.ratings.filter(item => {
        return item.rateType == 0;
      });
    },
    tcRatings() {
      return this.currentFood.ratings.filter(item => {
        return item.rateType == 1;
      });
    },
    ...mapState([
      "foodShow",
      "currentFood",
      "onlyShowTextRatings",
      "ratingsTabIndex"
    ])
  },
  components: {
    cartControl,
    interspace,
    ratingsTabOnly
  },
  watch: {
    foodShow() {
      this.refreshScroll();
    }
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

  .info {
    padding: 18px;

    .title {
      margin-bottom: 6px;
      font-size: 14px;
      color: #07111b;
    }

    .cont {
      padding: 0 8px;
      line-height: 2;
      font-size: 12px;
      color: #4d555d;
    }
  }

  .ratings {
    padding: 18px;

    .title {
      margin-bottom: 6px;
      font-size: 14px;
      color: #07111b;
    }
  }

  .ratings-list {
    .ratings-item {
      padding: 16px 18px;

      .top {
        margin-bottom: 6px;
        display: flex;
        justify-content: space-between;

        .time {
          line-height: 12px;
          font-size: 10px;
          color: #93999f;
        }

        .name-warpper {
          display: flex;
          align-items: center;

          .name {
            margin-right: 6px;
            font-size: 10px;
            color: #93999f;
          }

          .avatar {
            overflow: hidden;
            border-radius: 50%;
            width: 12px;
            height: 12px;

            img {
              width: 100%;
              height: 100%;
              vertical-align: top;
            }
          }
        }
      }

      .bottom {
        font-size: 12px;
        color: #07111b;
        display: flex;

        span {
          margin-right: 4px;

          &.icon-thumb_up {
            color: #00a0dc;
          }
        }
      }
    }
  }
}
</style>
