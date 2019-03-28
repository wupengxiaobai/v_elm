<template>
  <div class="ratings-wrapper">
    <div class="tabs border-bottom-1px">
      <div class="tab-item all" :class="{'active':ratingsTabIndex === 0}" @click="changeTabIndx(0)">
        全部
        <span>{{ allRatingsLen }}</span>
      </div>
      <div
        class="tab-item recommend"
        :class="{'active':ratingsTabIndex === 1}"
        @click="changeTabIndx(1)"
      >
        好评
        <span>{{ recommendRatingsLen }}</span>
      </div>
      <div class="tab-item tc" :class="{'active':ratingsTabIndex === 2}" @click="changeTabIndx(2)">
        吐槽
        <span>{{ tcRatingsLen }}</span>
      </div>
    </div>

    <div class="only-content" @click="changeSwitch">
      <div class="label icon-check_circle" :class="{'active': onlyShowTextRatings}"></div>
      <div class="text">只看有内容的评价</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    allRatingsLen: {
      type: Number,
      default: 0
    },
    recommendRatingsLen: {
      type: Number,
      default: 0
    },
    tcRatingsLen: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    changeTabIndx(index) {
      this.ratingsTabIndexOperation(index);
      this.$emit("refreshScroll",'111');
    },

    changeSwitch() {
      this.onlyShowTextRatingsOperation();
    },
    ...mapMutations([
      "onlyShowTextRatingsOperation",
      "ratingsTabIndexOperation"
    ])
  },
  computed: {
    ...mapState(["ratingsTabIndex", "onlyShowTextRatings"])
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/base.styl';

.ratings-wrapper {
  .tabs {
    padding-top: 18px;
    padding-bottom: 18px;
    display: flex;

    .tab-item {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      line-height: 16px;
      border-radius: 1px;
      font-size: 12px;
      color: #4d555d;

      &.recommend, &.all {
        background: rgba(0, 160, 220, 0.2);

        &.active {
          color: #fff;
          background: #00a0dc;
        }
      }

      &.tc {
        background: rgba(77, 85, 93, 0.2);

        &.active {
          color: #fff;
          background: #4d555d;
        }
      }
    }
  }

  .only-content {
    margin: 0 -18px;
    padding: 12px 18px;
    color: #93999f;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

    .label {
      margin-right: 4px;
      font-size: 24px;

      &.active {
        color: #00c850;
      }
    }

    .text {
      font-size: 12px;
    }
  }
}
</style>
