<template>
  <div class="wrapper">
    <label>
      姓名：
      <input type="text" :value="value" @change="$_handleChange">
      <button @click="$emit('submit')" style="margin-left: 10px">查询</button>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    $_handleChange (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>

</style>
