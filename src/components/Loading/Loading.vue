<template>
  <transition name="custom-loading-fade">
    <!--loading蒙版-->
    <div v-show="visible" class="custom-loading-mask">
      <!--loading中间的图标-->
      <div class="custom-loading-spinner">
        <!--loading上面显示的文字-->
        <p class="custom-loading-text">{{ text || '拼命加载中...' }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      text: '',
      visible: false
    }
  }
}
</script>

<style lang="scss">
  .custom-loading-mask{
    position: absolute;
    z-index: 2000;
    background-color: hsla(0,0%,100%,.9);
    margin: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity .3s;
  }

  .custom-loading-spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;

    .custom-loading-text {
      color: #409eff;
      margin: 3px 0;
      font-size: 14px;
    }

  }
</style>
