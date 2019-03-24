// 使用 cube-ui 的 createAPI 模块， 注册组件为一个方法

import {
  createAPI
} from 'cube-ui'

import Vue from 'vue'
// 注册headerCover组件
import HeaderCover from 'components/common/header/HeaderCover.vue'

createAPI(Vue, HeaderCover)
