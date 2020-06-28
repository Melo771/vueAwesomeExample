<template>
  <div>
    <label>
      用户名称：
    </label>
    <select v-model="value">
      <option value="张三">张三</option>
      <option value="李四">李四</option>
      <option value="王五">王五</option>
    </select>

    <p>{{value}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '张三'
    }
  },
  mounted () {
    console.log('mounted')
    const timer = setTimeout(() => {
      console.log('timer..')
    }, 100)

    // 在Vue组件中，可以用过$on,$once去监听所有的生命周期钩子函数，
    // 如监听组件的updated钩子函数可以写成 this.$on('hook:updated', () => {})
    this.$once('hook:beforeDestroy', () => {
      console.log('beforeDestroy')
      clearTimeout(timer)
    })
  }
}
</script>
