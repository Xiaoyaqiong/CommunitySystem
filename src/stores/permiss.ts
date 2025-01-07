import { defineStore } from "pinia";
import { useUserStore } from "./userdata";
import service from "@/utils/request";

export const usePermissStore = defineStore('permiss', () => {
    const currentPermiss = reactive({arr:[]})
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
        console.log(res.data,'123')
    }
    return {getAllPermission,currentPermiss,roles,updatePermiss}
},
)