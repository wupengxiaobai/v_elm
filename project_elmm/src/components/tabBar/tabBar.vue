<template>
  <div class="tabBar border-bottom-1px">
    <div class="links">
      <router-link
        v-for="(tab,index) in tabBarData"
        :key="index"
        tag="div"
        :to="tab.to"
      >{{ tab.label }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabBarData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/base.styl';

.tabBar {
  width: 100%;

  .links {
    position: relative;
    display: flex;
    line-height: 40px;
    height: 40px;

    &>div {
      flex: 1;
      text-align: center;

      &.active {
        color: red;
        border-bottom: 2px solid red;
      }
    }
  }
}
</style>
