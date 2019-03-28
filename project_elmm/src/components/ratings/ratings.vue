<template>
  <div class="ratings">
    <cube-scroll ref="scroll">
      <div class="top">
        <div class="left">
          <div class="score">{{ seller.score }}</div>
          <div class="desc">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="right">
          <div class="fw-score">
            <span>服务态度</span>
            <Stars class="stars" :size="36" :score="seller.serviceScore"/>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="goods-score">
            <span>商品评分</span>
            <Stars :size="36" :score="seller.foodScore"/>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="time">
            <span>送达时间</span>
            <div class="cont">{{ seller.deliveryTime }} 分钟</div>
          </div>
        </div>
      </div>
      <Interspace/>
      <div class="main">
        <ratingsTabOnly
          :allRatingsLen="allRatings.length"
          :recommendRatingsLen="recommendRatings.length"
          :tcRatingsLen="tcRatings.length"
          @refreshScroll="refreshScroll"
        />
        <div class="ratings-list">
          <div
            class="ratings-item border-bottom-1px"
            v-for="(rating,ratingsIndex) in selectRatings(ratingsTabIndex)"
            :key="ratingsIndex"
            :class="{'border-bottom-1px':ratingsIndex!=selectRatings(ratingsTabIndex).length-1}"
          >
            <div class="left">
              <div class="avatar">
                <img :src="rating.avatar" alt>
              </div>
            </div>
            <div class="right">
              <div class="top">
                <div class="username">{{ rating.username }}</div>
                <div
                  class="time"
                >{{ dateFormatDate(new Date(rating.rateTime), 'yyyy-MM-dd hh:mm:ss') }}</div>
              </div>
              <div class="score">
                <Stars :size="24" :score="rating.score" class="itemStars"/>
                <div class="time" v-if="rating.deliveryTime">{{ rating.deliveryTime }}</div>
              </div>
              <div class="content">{{ rating.text }}</div>
              <div class="bottom">
                <span :class="{'icon-thumb_up':rating.rateType==0}"></span>
                <span
                  v-for="(name,index) in rating.recommend"
                  :key="index"
                  class="commodity"
                >{{ name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import ratingsTabOnly from "components/common/ratingstabonly/ratingsTabOnly.vue";
import Interspace from "components/common/interspace/interspace.vue";
import Stars from "components/common/stars/stars.vue";
import { mapState } from "vuex";
import { dateFormatDate } from "common/js/tools";
export default {
  data() {
    return {};
  },
  methods: {
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
    //   重新渲染scroll组件
    refreshScroll() {
      this.$nextTick(() => {
        this.$refs.scroll && this.$refs.scroll.refresh();
      });
    },
    dateFormatDate(date, fmt) {
      return dateFormatDate(date, fmt);
    }
  },
  computed: {
    allRatings() {
      return this.ratings;
    },
    recommendRatings() {
      return this.ratings.filter(item => item.rateType == 0);
    },
    tcRatings() {
      return this.ratings.filter(item => item.rateType == 1);
    },
    ...mapState(["seller", "ratings", "onlyShowTextRatings", "ratingsTabIndex"])
  },
  components: {
    Stars,
    Interspace,
    ratingsTabOnly
  },
  created() {
    this.refreshScroll();
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/base.styl';

.ratings {
  flex: 1;
  height: calc(100% - 134px - 40px);

  .top {
    padding: 18px 0;
    display: flex;

    .left {
      flex: 0 0 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: #f90;
      }

      .desc {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: #07111b;
      }

      .rank {
        line-height: 10px;
        font-size: 10px;
        color: #93999f;
      }
    }

    .right {
      flex: 1;
      padding-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      &>div {
        display: flex;
        align-items: center;

        &>>> .stars {
          .star-item {
            margin-right: 6px;
          }
        }

        &>span {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: #07111b;
          margin-right: 12px;

          &.score {
            color: #f90;
            margin-left: 10px;
          }
        }

        &.time div {
          font-size: 12px;
          color: #93999f;
        }
      }
    }
  }

  .main {
    padding: 0 18px;

    .ratings-list {
      .ratings-item {
        padding: 18px 0;
        display: flex;

        .left {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;

          .avatar {
            overflow: hidden;
            width: 28px;
            height: 28px;
            border-radius: 50%;

            img {
              vertical-align: top;
              width: 100%;
              height: 100%;
            }
          }
        }

        .right {
          flex: 1;

          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;

            &>div {
              margin-bottom: 4px;
              font-size: 10px;
              color: #07111b;
            }
          }

          .score {
            margin-bottom: 6px;
            display: flex;
            align-items: center;

            .itemStars >>> .score-item {
              margin-right: 3px;
            }

            .time {
              margin-left: 10px;
              font-size: 10px;
              color: #93999f;
            }
          }

          .content {
            margin-bottom: 8px;
            line-height: 18px;
            color: #07111b;
            font-size: 12px;
            text-align: justify;
          }

          .bottom {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .icon-thumb_up {
              color: #00a0dc;
              margin: 0 8px 4px 0;
              font-size: 9px;
            }

            .commodity {
              padding: 3px 6px;
              margin-right: 8px;
              margin-bottom: 4px;
              font-size: 9px;
              color: #93999f;
              background: #fff;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
            }
          }
        }
      }
    }
  }
}
</style>
