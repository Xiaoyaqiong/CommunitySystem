import { defineStore } from "pinia";
export const usesideBarStore = defineStore('sideBar', () => { 
    const collapse = ref(false)
    const handleCollapse = () => { 
        collapse.value = !collapse.value
        console.log(collapse.value)
    }
    return { collapse ,handleCollapse}
})