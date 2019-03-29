<template>
  <div class="seller">
    <cube-scroll>
      <div class="seller-info" ref="scroll">
        <div class="top border-bottom-1px">
          <div class="left">
            <div class="name">{{ seller.name }}</div>
            <div class="scoreAbout">
              <div class="score">
                <Stars class="stars" :size="36" :score="seller.score"/>
              </div>
              <div class="num">（{{ seller.ratingCount }}）</div>
              <div class="month">月售{{ seller.sellCount }}单</div>
            </div>
          </div>
          <div class="right">
            <div class="favorite" :class="{'on':isFavorite}" @click="favorite">
              <span class="icon-favorite"></span>
              <span class="text">{{ favoriteText }}</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div>
            <div class="title">起送价</div>
            <div class="price">
              {{ seller.minPrice }}
              <span>元</span>
            </div>
          </div>
          <div>
            <div class="title">商家配送</div>
            <div class="price">
              4
              <span>元</span>
            </div>
          </div>
          <div>
            <div class="title">平均配送时间</div>
            <div class="price">
              {{ seller.deliveryTime }}
              <span>分钟</span>
            </div>
          </div>
        </div>
      </div>
      <Interspace/>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <div class="desc">{{ seller.bulletin }}</div>
        <div class="supports-list">
          <div
            class="supports-item border-top-1px"
            v-for="(support, supportIndex) in seller.supports"
            :key="supportIndex"
          >
            <supportIcon :size="3" :type="support.type"/>
            <div class="desc">{{ support.description }}</div>
          </div>
        </div>
      </div>
      <Interspace/>
      <div class="imgsWrapper">
        <div class="title">商家实景</div>
        <div class="imgs">
          <cube-scroll
            ref="scrollHor"
            :options="scrollHorOptions"
            direction="horizontal"
            class="horizontal-scroll-list-wrap"
          >
            <div class="img" v-for="(pic,picIndex) in seller.pics" :key="picIndex">
              <img :src="pic" alt>
            </div>
          </cube-scroll>
        </div>
      </div>
      <Interspace/>
      <div class="lastDetail">
        <div class="title">商家信息</div>
        <div class="list border-top-1px" v-for="(info,infoIndex) in seller.infos" :key="infoIndex">
          <div class="item">{{ info }}</div>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import Stars from "components/common/stars/stars.vue";
import Interspace from "components/common/interspace/interspace.vue";
import supportIcon from "components/common/support-ico/support-ico.vue";
import { mapState } from "vuex";
import { loadFromLocal, saveToLocal } from "common/js/storage.js";

const KEY = "favorite";
export default {
  data() {
    return {
      scrollHorOptions: {
        /* click: false,
        directionLockThreshold: 0 */
      },
      isFavorite: false
    };
  },
  methods: {
    favorite() {
      //   收藏状态改变
      this.isFavorite = !this.isFavorite;
      //   修改本地存储
      saveToLocal(this.seller.id, KEY, this.isFavorite);
      console.log(loadFromLocal(this.seller.id, KEY, false));
    }
  },
  computed: {
    favoriteText() {
      return this.isFavorite ? "已收藏" : "收藏";
    },
    ...mapState(["seller"])
  },
  components: {
    Stars,
    Interspace,
    supportIcon
  },
  created() {
    this.isFavorite = loadFromLocal(this.seller.id, KEY, false);
    console.log("seller--", this.seller);
    console.log("isFavorite", this.isFavorite);
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/base.styl';
@import 'common/stylus/icon.styl';

.seller {
  height: calc(100% - 134px - 40px);

  .seller-info {
    padding: 18px;

    .top {
      padding-bottom: 18px;
      display: flex;
      justify-content: space-between;

      .left {
        .name {
          margin-bottom: 8px;
          line-height: 14px;
          color: #07111b;
          font-size: 14px;
        }

        .scoreAbout {
          display: flex;
          align-items: center;

          .score>>>.stars {
            .star-item {
              margin-right: 6px;
            }
          }

          &>div.num, &>div.month {
            margin-right: 12px;
            font-size: 10px;
            color: #4d555d;
          }
        }
      }

      .right .favorite {
        width: 40px;
        flex: 0 0 50px;
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        text-align: center;

        &.on {
          .icon-favorite {
            color: #f40;
          }
        }

        .icon-favorite {
          display: block;
          margin-bottom: 4px;
          line-height: 24px;
          font-size: 24px;
          color: #d4d6d9;
        }

        .text {
          line-height: 10px;
          font-size: 10px;
          color: #4d555d;
        }
      }
    }

    .bottom {
      padding-top: 18px;
      display: flex;

      &>div {
        font-size: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        &:nth-of-type(2) {
          border-left: 1px solid rgba(7, 17, 27, 0.1);
          border-right: 1px solid rgba(7, 17, 27, 0.1);
        }

        &>.title {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: #93999f;
        }

        &>.price {
          font-size: 24px;

          span {
            font-size: 10px;
            color: #07111b;
          }
        }
      }
    }
  }

  .bulletin {
    padding: 18px 18px 0 18px;

    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: #07111b;
      font-size: 14px;
    }

    &>.desc {
      padding: 0 12px 16px 12px;
      line-height: 24px;
      font-size: 12px;
      color: #f01414;
    }

    .supports-list {
      .supports-item {
        padding: 16px 12px;
        font-size: 0;
        display: flex;
        align-items: center;

        .desc {
          margin-left: 6px;
          line-height: 16px;
          font-size: 12px;
          color: #07111b;
        }
      }
    }
  }

  .imgsWrapper {
    padding: 18px;

    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: #07111b;
      font-size: 14px;
    }

    .imgs {
      width: 100%;
      height: 90px;
      overflow: hidden;

      &>>>.cube-scroll-content {
        width: 504px; // 120*4+ 6*4
      }

      .img {
        margin-right: 6px;
        display: inline-block;
        width: 120px;
        height: 90px;

        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
    }
  }

  .lastDetail {
    padding: 18px;

    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: #07111b;
      font-size: 14px;
    }

    .list {
      .item {
        padding: 16px 12px;
        line-height: 16px;
        position: relative;
        font-size: 12px;
      }
    }
  }
}
</style>
