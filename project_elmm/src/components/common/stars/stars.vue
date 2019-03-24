<template>
  <div class="stars" :class="starSize">
    <span v-for="(item,index) in starClassArr" :class="item" :key="index" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  props: {
    size: {
      type: Number,
      default() {
        return 24;
      }
    },
    score: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  computed: {
    starSize() {
      return `star${this.size}`;
    },
    starClassArr() {
      let typeArr = [];
      let c2 = Math.floor(this.score * 2) / 2;
      let zs = Math.floor(c2); //  整数部分
      let xs = c2 % 1 !== 0; //小数部分
      for (let i = zs; i > 0; i--) {
        typeArr.push(CLS_ON);
      }
      if (xs) {
        typeArr.push(CLS_HALF);
      }
      while (typeArr.length < LENGTH) {
        typeArr.push(CLS_OFF);
      }
      //   console.log(typeArr);
      return typeArr;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/mixin';

.stars {
  display: flex;
  justify-content: center;

  &.star24 {
    .star-item {
      margin: 0 12px;
      width: 10px;
      height: 10px;
      background-size: 10px 10px;
    }

    .on {
      bg-image('star24_on');
    }

    .half {
      bg-image('star24_half');
    }

    .off {
      bg-image('star24_off');
    }
  }

  &.star36 {
    .star-item {
      margin: 0 12px;
      width: 15px;
      height: 15px;
      background-size: 15px 15px;
    }

    .on {
      bg-image('star36_on');
    }

    .half {
      bg-image('star36_half');
    }

    .off {
      bg-image('star36_off');
    }
  }

  &.star48 {
    .star-item {
      margin: 0 12px;
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
    }

    .on {
      bg-image('star48_on');
    }

    .half {
      bg-image('star48_half');
    }

    .off {
      bg-image('star48_off');
    }
  }
}
</style>
