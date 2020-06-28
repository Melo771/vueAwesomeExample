<template>
  <div class="custom-overlay" v-show="visible" @click="$emit('update:visible', false)"></div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
  .custom-overlay {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0 ,0, 0, .3);
  }
</style>
