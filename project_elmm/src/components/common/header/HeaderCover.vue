<template>
  <transition name="fade">
    <div class="cover" v-show="visible">
      <div class="main">
        <div class="main-wrapper">
          <div class="name">粥品香坊（回龙观）</div>
          <div class="star-wrapper">
            <Stars class="stars" :size="48" :score="sellerData.score"/>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <div class="supports">
            <div v-for="(item,index) in sellerData.supports" :key="index" class="support-item">
              <Icon :size="2" :type="item.type" class="icon"/>
              <div class="text">{{ item.description }}</div>
            </div>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">{{ sellerData.bulletin }}</div>
        </div>
      </div>
      <div class="close">
        <i class="icon-close" @click="hide"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import Stars from "../stars/stars.vue";
import Icon from "../support-ico/support-ico.vue";
export default {
  name: "header-cover",
  props: {
    sellerData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      visible: false //  该组件显示与否
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  },
  components: {
    Stars,
    Icon
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/variable';

/* 动画进场状态 */
.fade-enter-active {
  transition: all 0.3s ease;
}

/* 动画出场状态 */
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

/* 动画状态起始/结束定点状态 */
.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.cover {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-color: $color-background-S;
  overflow: auto;

  .main {
    position: relative;
    width: 100%;
    min-height: 100%;
    overflow: hidden;

    .main-wrapper {
      margin-top: 64px;
      padding-bottom: 64px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &>div {
        width: 100%;
        text-align: center;
      }

      .name {
        font-size: 16px;
        font-weight: bold;
      }

      .star-wrapper {
        margin-top: 18px;
        padding: 2px 0;
        text-align: center;

        .stars {
          &>>>.star-item {
            margin: 0 12px;
          }
        }
      }

      .title {
        width: 80%;
        margin: 28px auto 24px auto;
        position: relative;
        display: flex;
        align-items: center;

        .line {
          flex: 1;
          border-bottom: 1px solid $color-background-2S;
        }

        .text {
          flex: 0 0 80px;
          font-size: 14px;
        }
      }

      .supports {
        width: 80%;
        height: 128px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .support-item {
          display: flex;
          align-items: center;

          .icon {
            margin-right: 6px;
          }

          .text {
            font-size: 12px;
          }
        }
      }

      .bulletin {
        width: 80%;
        line-height: 24px;
        text-align: justify;
        font-size: 12px;
      }
    }
  }

  .close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    font-size: 32px;
  }
}
</style>
