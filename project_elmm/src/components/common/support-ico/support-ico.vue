<template>
  <span class="support-icon" :class="iconClass"></span>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 1
    },
    type: {
      type: Number,
      default: 1
    }
  },
  computed: {
    iconClass() {
      const classMaps = [
        "decrease",
        "discount",
        "guarantee",
        "invoice",
        "special"
      ];
      return `icon-${this.size} ${classMaps[this.type]}`;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/mixin';

.support-icon {
  display: inline-block;
  background-repeat: no-repeat;
}

.icon-1 {
  width: 12px;
  height: 12px;
  background-size: 12px 12px;

  &.decrease {
    bg-image('decrease_1');
  }

  &.discount {
    bg-image('decrease_1');
  }

  &.guarantee {
    bg-image('decrease_1');
  }

  &.invoice {
    bg-image('decrease_1');
  }

  &.special {
    bg-image('decrease_1');
  }
}

.icon-2 {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;

  &.decrease {
    bg-image('decrease_2');
  }

  &.discount {
    bg-image('decrease_2');
  }

  &.guarantee {
    bg-image('decrease_2');
  }

  &.invoice {
    bg-image('decrease_2');
  }

  &.special {
    bg-image('decrease_2');
  }
}

.icon-3 {
  width: 22px;
  height: 22px;
  background-size: 18px 18px;

  &.decrease {
    bg-image('decrease_3');
  }

  &.discount {
    bg-image('decrease_3');
  }

  &.guarantee {
    bg-image('decrease_3');
  }

  &.invoice {
    bg-image('decrease_3');
  }

  &.special {
    bg-image('decrease_3');
  }
}

.icon-4 {
  width: 26px;
  height: 26px;
  background-size: 26px 26px;

  &.decrease {
    bg-image('decrease_4');
  }

  &.discount {
    bg-image('decrease_4');
  }

  &.guarantee {
    bg-image('decrease_4');
  }

  &.invoice {
    bg-image('decrease_4');
  }

  &.special {
    bg-image('decrease_4');
  }
}
</style>
