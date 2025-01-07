<template>
  <el-aside :width="width">
    <el-scrollbar>
      <el-menu
        :default-active="$route.path"
        background-color="#324157"
        text-color="#bfcbd9"
        :collapse="isCollapse"
        active-text-color="#20a0ff"
        :collapse-transition="false"
        router
      >
        <template
          v-for="(menuItem, menuIndex) in sideBarTitle"
          :key="menuIndex"
        >
          <template v-if="!menuItem.children">
            <el-menu-item
              :index="menuItem.index"
              click=""
              v-if="menuItem.permiss.includes(userRole)"
            >
              <el-icon size="15"
                ><component :is="menuItem.icon"></component></el-icon
              ><span>{{ menuItem.title }}</span>
            </el-menu-item>
          </template>
          <template v-else>
            <el-sub-menu
              :index="menuItem.index"
              v-if="menuItem.permiss.includes(userRole)"
            >
              <template #title>
                <el-icon size="15"
                  ><component :is="menuItem.icon"></component></el-icon
                ><span>{{ menuItem.title }}</span>
              </template>
              <el-menu-item-group
                v-for="(submenuItem, submenuIndex) in menuItem.children"
                :key="submenuIndex"
              >
                <el-menu-item :index="submenuItem.index">
                  <template #title>
                    <el-icon size="15"
                      ><component :is="submenuItem.icon"></component
                    ></el-icon>
                    <span>{{ submenuItem.subtitle }}</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script lang="ts" setup>
import { usesideBarStore } from "@/stores/sideBar";
import { sideBarTitle } from "./sideBarTitle";
import { computed } from "vue";
import { useUserStore } from "@/stores/userdata";
const userStore = useUserStore();
const userRole = parseInt(userStore.personInfo.role);
const sideBarStore = usesideBarStore();
const isCollapse = computed(() => {
  return sideBarStore.collapse;
});
const width = computed(() => (sideBarStore.collapse ? "64px" : "300px"));
</script>
<style>
.el-aside {
  height: 100vh;
  background-color: #324157;
}
.el-menu {
  border-right: none;
}
</style>
