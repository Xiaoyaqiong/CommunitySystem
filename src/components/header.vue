<template>
  <el-header>
    <div class="header">
      <div class="l-content">
        <el-icon size="25" color="white" @click="handleSideBar"
          ><Operation
        /></el-icon>
        <span>{{ userName }}欢迎回来</span>
      </div>
      <div class="r-content">
        <el-icon size="25" color="white"><Bell /></el-icon>
        <el-dropdown @command="handleCommand">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>
<script lang="ts" setup>
import router from "@/router";
import { usesideBarStore } from "@/stores/sideBar";
import { useUserStore } from "@/stores/userdata";

const sideBarStore = usesideBarStore();
const handleSideBar = () => {
  sideBarStore.handleCollapse();
};
const userStore = useUserStore();
const userName = userStore.personInfo.userName;

const handleCommand = (command) => {
  if (command == "user") {
    router.push("/user");
  } else if (command == "logout") {
    userStore.delData();
    localStorage.clear();
    router.push("/login");
  }
};
</script>
<style scoped>
.el-header {
  position: absolute;
  height: 70px;
  right: 0;
  left: 0;
  top: 0;
  background-color: black;
}
.header {
  line-height: 70px;
  display: flex;
  justify-content: space-between;
}
.l-content {
  color: white;
}
.el-icon {
  vertical-align: middle;
  margin-right: 20px;
}
.el-dropdown {
  vertical-align: middle;
}
</style>
