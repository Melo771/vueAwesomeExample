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

    <hr>
    <!--  loading  -->
    <h2>Vue.extend 自定义全局组件</h2>
    <button @click="handleShowLoading">loading</button>

    <hr>
    <!--  directive  -->
    <div style="position: relative" v-loadingV2="loadingVisible">
      <h2>自定义指令</h2>
      <button @click="handleShowDirectiveLoading">directive loading</button>
    </div>

    <hr>
    <!-- vm.$watch -->
    <h2>命令式的 vm.$watch API 可随时监听，随时取消</h2>
    <div>
      <input v-model="watchForm.name" type="text">
      <input v-model="watchForm.age" type="text">
      <button :disabled="watchFormBtnDisable">保存</button>
    </div>

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
      onceShow: true,
      loadingVisible: false,
      watchForm: {
        name: '',
        age: ''
      },
      watchFormBtnDisable: true
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
    },
    handleShowLoading () {
      const loading = this.$loading({ text: '正在加载。。。' })
      // 三秒钟后关闭
      const timer = setTimeout(() => {
        loading.close()
      }, 3000)

      this.$on('hook:beforeDestroy', () => {
        clearTimeout(timer)
      })
    },
    handleShowDirectiveLoading () {
      this.loadingVisible = true

      const timer = setTimeout(() => {
        this.loadingVisible = false
      }, 2000)

      this.$on('hook:beforeDestroy', () => {
        clearTimeout(timer)
      })
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
  },
  mounted () {
    // 模拟异步获取表单数据
    const timer = setTimeout(() => {
      this.watchForm = {
        name: '小明',
        age: 20
      }

      // 等表单数据回填之后，监听数据是否发生变化
      this.$watch(
        'watchForm',
        () => {
          console.log('数据发生了变化')
          this.watchFormBtnDisable = false
        },
        {
          deep: true
        }
      )
      // unwatch()
    }, 2000)
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer)
    })
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
