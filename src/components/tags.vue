<template>
  <div class="tagContainer">
    <div class="l-tags">
      <el-tag
        v-for="(tag, index) in taglist.tag"
        :key="index"
        closable
        :effect="getEffect(tag.fullPath)"
        @click="changeView(tag)"
        @close="closeView(index)"
      >
        {{ tag.name }}
      </el-tag>
    </div>
    <div class="r-tags">
      <el-dropdown @command="handleCommand">
        <el-button type="primary">
          标签选项<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { useTagStore } from "@/stores/tag";
import { reactive, onMounted, watch, effect } from "vue";
import { useRoute } from "vue-router";
const currentRoute = useRoute();
const TagStore = useTagStore();
const taglist = TagStore.taglist;

const getEffect = (path) => {
  return path === currentRoute.fullPath ? "dark" : "plain";
};
onMounted(() => {
  TagStore.getCurrentPath(currentRoute);
  console.log("currentRoute", currentRoute);
});

watch(currentRoute, () => {
  TagStore.getCurrentPath(currentRoute);
});

const changeView = (tag) => {
  router.push(tag.fullPath);
};
const closeView = (index) => {
  const delItem = TagStore.taglist.tag[index];
  TagStore.delTagsItem(index);
  const item = TagStore.taglist.tag[index]
    ? TagStore.taglist.tag[index]
    : TagStore.taglist.tag[index - 1];
  if (item) {
    delItem.fullPath === currentRoute.fullPath && router.push(item.fullPath);
  } else {
    router.push("/");
  }
};

const handleCommand = (command) => {
  if (command == "other") {
    const curlist = TagStore.taglist.tag.filter(
      (item) => item.fullPath === currentRoute.fullPath
    );
    TagStore.delOtherTags(curlist);
  } else if (command == "all") {
    if (currentRoute.fullPath != "/dashboard") {
      TagStore.delAllTags();
      router.push("/");
    }
  }
};
</script>
<style scoped>
.tagContainer {
  display: flex;
  justify-content: space-between;
}
</style>
