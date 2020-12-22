<template>
  <el-menu
    router
    default-active="1-4-1"
    background-color="#545c64"
    text-color="#fff"
    class="el-menu-vertical-demo"
    :mode="horizontalfn"
    menu-trigger="click"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :default-openeds="openeds"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-fold"></i>
        <span slot="title">项目管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/index">
          <i class="el-icon-menu"></i>项目报价
        </el-menu-item>
        <el-menu-item index="/productslist">
          <i class="el-icon-user-solid"></i>配件管理
        </el-menu-item>
        <el-menu-item index="/productstemplate">
          <i class="el-icon-s-shop"></i>配套管理
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item v-show="hidebox" @click="boxshow">
      <i class="el-icon-arrow-left"></i>
      <span slot="title">收起</span>
    </el-menu-item>
    <el-menu-item v-show="showbox" @click="boxshow">
      <i class="el-icon-arrow-right" ></i>
      <span slot="title">展开</span>
    </el-menu-item>
  </el-menu>
</template>
<script scoped>
export default {
  data () {
    return {
      horizontalfn: 'vertical',
      openeds: ['1'],
      isCollapse: false,
      showbox: false,
      hidebox: true
    }
  },
  mounted () {
    this.boxplay()
  },
  methods: {
    // clickend () {
    //   setTimeout(() => {
    //   }, timeout);
    // }
    boxplay () {
      if (document.body.offsetWidth < 980) {
        this.horizontalfn = 'horizontal'
        this.isCollapse = true
        this.showbox = false
        this.hidebox = false
      }
    },
    boxshow () {
      this.showbox = !this.showbox
      this.hidebox = !this.hidebox
      this.isCollapse = !this.isCollapse
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }

  }
}
</script>
