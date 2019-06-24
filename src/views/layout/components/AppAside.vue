<template>
    <el-menu
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
    <el-menu-item index="/">
      <i class="iconfont icon-home" ></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-submenu index="1">
      <template slot="title">
        <i class="iconfont icon-document"></i>
        <span>内容</span>
      </template>
      <el-menu-item index="/publish">
        <i class="iconfont" icon-edit></i>
        <span slot="title">发布</span>
      </el-menu-item>
      <el-menu-item index="1-3">
        <i class="iconfont icon-icon-articles"></i>
        <span slot="title">内容列表</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/comment">
      <i class="icontfont icon-comment"></i>
      <span slot="title">评论</span>
    </el-menu-item>
     <el-menu-item index="/image">
      <i class="icontfont icon-image"></i>
      <span slot="title">素材</span>
    </el-menu-item>
     <el-menu-item index="/fans">
      <i class="icontfont icon-fensi"></i>
      <span slot="title">粉丝</span>
    </el-menu-item>
     <el-menu-item index="/accout">
      <i class="icontfont icon-account"></i>
      <span slot="title">账户</span>
    </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },

    handleClose () {

    }
  }
}
</script>

<style lang="less" scoped>
.el-menu{
  height: 100%;
}
.iconfont{
  margin-right:10px;
}
</style>
