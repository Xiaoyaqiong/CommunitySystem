import { defineStore } from "pinia";
import { useUserStore } from "./userdata";
import service from "@/utils/request";
import { ElMessage } from "element-plus";

export const usePermissStore = defineStore('permiss', () => {
    const currentPermiss = ref([])
    const roles =reactive( {
        admin: [],
        user:[]
    })
     async function getAllPermission() {
         const permissResult = await service({
             url: '/permission/getAllpermission',
             method: 'GET',
         }
         )
          if (permissResult && permissResult.code === 200 && permissResult.data) {
        permissResult.data.forEach(item => {
      if (item.role === '0') {
        roles.admin = item.permission.split(',');
      } else {
        roles.user = item.permission.split(',');
      }
    });
  }
    }
    async function updatePermiss(role, newList) {
        role = role == 'admin' ? 0 : 1;
         const res = await service({
             url: '/permission/UpdatePermissionByID',
             method: 'POST',
             data: {
                 role:role,
                 newList
             }
         }
      )
      if (res.code == 200) {
        ElMessage.success(res.msg)
        setTimeout(() => {
          history.go(0)
        }, 800)
      } else { 
        ElMessage.error(res.msg)
      }
  }
  async function getCurrentPermiss() {
    const userStore = useUserStore()
    const res = await service({
      url: '/permission/getpermissionByID',
      method: 'POST',
      data: {
        id:userStore.personInfo.id
      }
    })
    currentPermiss.value = res.data[0].permission.split(",")
    }
    return {getAllPermission,currentPermiss,roles,updatePermiss,getCurrentPermiss}
},
)