<template>
  <div class="tab">
    <!-- cube tab组件 :data="tabs" @change="tabChange"-->
    <cube-tab-bar
      :show-slider="true"
      :useTransition="false"
      v-model="selectedLabel"
      ref="tabbar"
      class="border-bottom-1px"
    >
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index"></cube-tab>
    </cube-tab-bar>

    <!-- cube slide组件 @change="slideChange"-->
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :speed="200"
        :showDots="false"
        :initial-index="selectedIndex"
        @scroll="scroll"
        @change="slideChange"
        :options="slideOptions"
        ref="slide"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
        <!-- <cube-slide-item>
          <Goods/>
        </cube-slide-item>
        <cube-slide-item>
          <Ratings/>
        </cube-slide-item>
        <cube-slide-item>
          <Seller/>
        </cube-slide-item>-->
      </cube-slide>
    </div>
  </div>
</template>

<script>
/* import Goods from "components/goods/goods";
import Seller from "components/seller/seller";
import Ratings from "components/ratings/ratings"; */
export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedIndex: 0,
      //   tabs: ["商品", "评论", "商家"], // 外部传入, 高度提取该组件
      slideOptions: {
        //  实时监测距离配置
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    };
  },
  components: {
    /* Goods,
    Seller,
    Ratings */
  },
  methods: {
    //   tab 发生切换触发
    /* tabChange(tabCurrent) {
      //   console.log("tabChange拿取索引 ", this.tabs.indexOf(tabCurrent));
      this.selectedLabel = tabCurrent;
    }, */
    slideChange(slideCurrent) {
      //  slide 发生切换触发
      this.selectedIndex = slideCurrent;
    },
    scroll(post) {
      //  slide 实时监听滚动距离, 执行tabbar跟踪设置transform位置
      let tabWidth = this.$refs.tabbar.$el.clientWidth;
      let slideWidth = this.$refs.slide.slide.scrollerWidth;
      let transform = (-post.x / slideWidth) * tabWidth;
      this.$refs.tabbar.setSliderTransform(transform);
    }
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.selectedIndex].label;
      },
      set(newVal) {
        //  当selectedLabel发生变化触发其set函数修改selectedIndex -> 修改 slide 组件的 initialIndex 值,达到触发修改slide
        this.selectedIndex = this.tabs.findIndex(value => {
          return value.label === newVal;
        });
      }
    }
  },
  created() {
    this.selectedIndex = this.initialIndex;
  }
};
</script>

<style lang="stylus" scoped>
.tab {
  width: 100%;
  display: flex;
  flex-direction: column;

  .slide-wrapper {
    width: 100%;
    flex: 1;
    overflow: hidden;
  }

  & >>> .cube-tab {
    padding: 10px 0;
  }
}
</style>

