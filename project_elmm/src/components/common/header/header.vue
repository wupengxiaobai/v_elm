<template>
  <div class="header" v-if="sellerData.name" @click="showCover">
    <div class="main">
      <div class="avatar">
        <img :src="sellerData.avatar" :alt="sellerData.bulletin">
      </div>
      <div class="desc">
        <div class="title">
          <span class="icon"></span>
          <span class="name">{{ sellerData.name }}</span>
        </div>
        <div class="stime">{{ sellerData.description }}/{{ sellerData.deliveryTime }}分钟送达</div>
        <div class="activity">
          <Icon :size="1" :type="sellerData.supports[0].type"/>
          <span class="txt">{{ sellerData.supports[0].description }}</span>
        </div>
      </div>
      <div class="support-count">
        {{ sellerData.supports.length }}个
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="footer">
      <span class="icon"></span>
      <div class="desc text-ov">{{ sellerData.bulletin }}</div>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 头部组件的弹出层 -->
    <!-- <headerCover :sellerData="sellerData"/> -->
  </div>
</template>

<script>
import Icon from "../support-ico/support-ico.vue";
// import headerCover from "./header-cover.vue";
export default {
  props: {
    sellerData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    //   使用 cube-ui的createAPI模块定义的方法 , 展示头部的cover 组件
    showCover() {
      this.HeaderCoverComp =
        this.HeaderCoverComp ||
        this.$createHeaderCover({
          $props: {
            sellerData: "sellerData"
          }
        });
      //  调用该组件的show方法显示弹出层
      this.HeaderCoverComp.show();
    }
  },
  components: {
    Icon
    // headerCover
  },
  created() {}
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/mixin';
@import 'common/stylus/variable';
@import 'common/stylus/icon';

.header {
  background: $color-background-SS;
  color: #fff;

  &>.main {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .avatar {
      flex: 0 0 64px;
      width: 64px;
      height: 64px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .desc {
      margin-left: 16px;
      height: 60px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        span.icon {
          display: inline-block;
          width: 30px;
          height: 18px;
          background-size: 30px 18px;
          vertical-align: top;
          bg-image('brand');
        }

        .name {
          margin-left: 6px;
          line-height: 18px;
          font-size: 16px;
          font-weight: bold;
        }
      }

      .stime {
        line-height: 12px;
        font-size: 12px;
      }

      .activity {
        display: flex;
        align-items: center;

        .txt {
          margin-left: 4px;
          font-size: 10px;
        }
      }
    }

    .support-count {
      font-size: 10px;
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: $color-background-2;
      text-align: center;
      display: flex;
      align-items: center;

      i {
        margin-left: 2px;
      }
    }
  }

  &>.footer {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    background: $color-background-SSS;
    display: flex;
    align-items: center;

    .icon {
      display: inline-block;
      flex: 0 0 22px;
      width: 22px;
      height: 12px;
      background-size: 22px 12px;
      bg-image('bulletin');
    }

    .desc {
      margin-left: 4px;
      font-size: 10px;
      flex: 1;
    }

    i {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
    }
  }
}
</style>
