<template>
    <div class="layout-wrap">
        <AppAside></AppAside>
        <AppHeader></AppHeader>
    </div>
</template>

<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'AppLayout',
  component: {
    AppAside,
    AppHeader
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
</style>
