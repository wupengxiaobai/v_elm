<template>
  <div class="header" v-if="sellerData.name">
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
    <div class="bottom"></div>
  </div>
</template>

<script>
import Icon from "../support-ico/support-ico.vue";
export default {
  props: {
    sellerData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    Icon
  },
  created() {
    /* setTimeout(() => {
      console.log(`header拿到了seller数据: ${JSON.stringify(this.sellerData)}`);
    }, 1000); */
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/mixin';
@import 'common/stylus/variable';
@import 'common/stylus/icon';

.header {
  background-color: rgba(0, 0, 0, 0.2);
  background: rgba(7, 17, 27, 0.5);

  .main {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    color: #fff;
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
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      display: flex;
      align-items: center;

      i {
        margin-left: 2px;
      }
    }
  }
}
</style>

