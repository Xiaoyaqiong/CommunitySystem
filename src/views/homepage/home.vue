<template>
  <div class="layout-container">
    <vheader />
    <el-container>
      <vsideBar />
      <el-main>
        <div class="tags"><vtags /></div>
        <router-view class="router"></router-view>
      </el-main>
    </el-container>
  </div>
  <!-- <h1>home</h1> -->
</template>
<script setup lang="ts">
import vsideBar from "../../components/sideBar.vue";
import vheader from "../../components/header.vue";
import vtags from "../../components/tags.vue";
</script>
<style scoped>
.el-container {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 70px;
}
.el-main {
  margin: 0;
  padding: 0;
}
.tags {
  height: 35px;
  line-height: 35px;
  padding: 0 6px;
  border-bottom: 1px solid var(--el-border-color-light);
}
.router {
  padding: 15px;
  box-sizing: border-box;
}
</style>
