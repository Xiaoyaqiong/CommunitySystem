import { defineStore } from "pinia";
export const useTagStore = defineStore('TagStore', () => { 
    // 存储的路由
    const taglist = reactive({ tag: [] });
    const getCurrentPath = (route) => {
  const isExist = taglist.tag.some(
    (item) => item.fullPath === route.fullPath
  );
      if (!isExist) {
    taglist.tag.push({
      name: route.meta.title,
      fullPath: route.fullPath,
    });
  }
  };
  const delTagsItem = (index) => {
    taglist.tag.splice(index, 1);
  };
  const delOtherTags = (data) => { 
    taglist.tag=data
  }
  const delAllTags = () => { 
    taglist.tag = []
}
    return {taglist,getCurrentPath,delTagsItem,delOtherTags,delAllTags}
}, 
)