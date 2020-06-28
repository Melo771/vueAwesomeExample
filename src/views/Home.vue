<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.svg"
      width="500"
    >

    <!--  使用$attrs 与 $listeners，二次包装组件  -->
    <h2>使用$attrs 与 $listeners，二次包装组件</h2>
    <custom-dialog
      :visible.sync="visibleDialog"
      title="测试弹框"
      @opened="$_handleOpened"
      @confirm="$_handleConfirm"
      @cancel="$_handleCancel"
    />
    <button @click="visibleDialog = true">打开</button>

    <hr>

    <!--  自定义v-model  -->
    <h2>自定义v-model</h2>
    <custom-input
      v-model="inputVal"
      @submit="handleInputSubmit"
    />
    <p>{{previewVal}}</p>

    <hr>

    <!--  .async   -->
    <h2> .async </h2>
    <button @click="visible = true">打开遮罩</button>
    <async-example :visible.sync="visible" />

    <hr>

    <!-- 动态组件 -->
    <h2>动态组件</h2>
    <component :is="roleComponent" v-if="roleComponent" />

    <hr>
    <!--  $once 内部监听生命周期函数 -->
    <!-- 通过@hook:updated监听组件的updated生命钩子函数 -->
    <!-- 组件的所有生命周期钩子都可以通过@hook:钩子函数名 来监听触发 -->
    <h2>HookEvent</h2>
    <once @hook:updated="handleOnceUpdate" v-if="onceShow" />
    <button @click="onceShow = false">移除Once组件</button>

  </div>
</template>

<script>
import CustomDialog from '../components/CustomDialog'
import CustomInput from '../components/CustomInput'
import AsyncExample from '../components/AsyncExample'
import Admin from '../components/DynamicComponents/Admin'
import User from '../components/DynamicComponents/User'
import Sales from '../components/DynamicComponents/Sales'
import Once from '../components/$onceExample'

export default {
  name: 'Home',
  model: {
    event: 'change', // 自定义v-model 属性名和事件名
    prop: 'val'
  },
  components: {
    CustomDialog,
    CustomInput,
    AsyncExample,
    Admin,
    User,
    Sales,
    Once
  },
  data () {
    return {
      visibleDialog: false,
      inputVal: '李四',
      previewVal: '',
      visible: false,
      roleComponents: {
        admin: Admin,
        user: User,
        sales: Sales
      },
      roleComponent: null,
      onceShow: true
    }
  },
  methods: {
    $_handleOpened () {
      console.log('open')
    },
    $_handleConfirm () {
      this.visibleDialog = false
    },
    $_handleCancel () {
      this.visibleDialog = false
    },
    handleInputSubmit () {
      this.previewVal = `学生名称${this.inputVal}`
    },
    handleOnceUpdate () {
      console.log('once component updated..')
    }
  },
  created () {
    this.timer = setTimeout(() => {
      const role = 'admin'
      this.roleComponent = this.roleComponents[role]
    }, 300)
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style>
  hr {
    margin: 30px 0;
  }

  .custom-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0 ,0, 0, .3);
  }
</style>
