<template>
  <div>
    <p>
      {{ userInfo.name }}
    </p>
    <p>
      <button @click="setUserInfo">更改名称</button>
    </p>

    <button @click="setAboutInfo">更改about页面文本信息</button>
  </div>
</template>

<script>
import { store, mutations } from './store'
export default {
  computed: {
    userInfo () {
      return store.userInfo
    }
  },
  methods: {
    setUserInfo () {
      mutations.setUserInfo({
        name: '小明'
      })
    },
    setAboutInfo () {
      mutations.setAboutInfo('hello welcome about page')
    }
  }
}
</script>
