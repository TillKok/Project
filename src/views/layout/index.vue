<template>
    <!-- <div class="layout-wrap">
        <AppAside></AppAside>
        <AppHeader></AppHeader>
    </div> -->
    <el-container>
        <el-aside width="200px">
        </el-aside>
        <el-container>
            <el-header>
                <AppHeader></AppHeader>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
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
.el-container{
    height: 100%;
}
.el-aside{
    background-color:#343a46;
}
.el-header{
    background-color:#aec0d1;
}
.el-main{
    background-color:#e8eff4;
}
</style>
