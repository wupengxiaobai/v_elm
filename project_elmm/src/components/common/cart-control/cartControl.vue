<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrement" v-show="food.count>0" @click.stop="decrement">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
    <div class="cart-add" @click.stop="increment">
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>

<script>
const EVENT_ADD = "add";

import { mapMutations } from "vuex";
export default {
  name: "cart-control",
  props: {
    food: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    decrement() {
      if (this.food.count > 0) {
        this.food.count--;
      }
    },
    increment(event) {
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      // 派发一个add事件传递给父组件,携带当前事件源对象
      // this.$emit(EVENT_ADD, event.target);
      this.ballEvent();
    },
    ...mapMutations([
      "ballEvent"
    ])
  }
};
</script>


<style lang="stylus" scoped>
.inner {
  display: inline-block;
  transition: all 0.4s linear;
  transform: rotate(0deg);
}

.move-enter-active, .move-leave-active {
  transition: all 0.4s linear;
}

.move-enter, .move-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);

  .inner {
    transform: rotate(180deg);
  }
}

.cartcontrol {
  position: absolute;
  right: 0;
  line-height: 20px;

  &>div {
    float: left;

    &.cart-count {
      text-align: center;
      width: 30px;
    }

    &>span {
      font-size: 20px;
    }
  }
}
</style>
