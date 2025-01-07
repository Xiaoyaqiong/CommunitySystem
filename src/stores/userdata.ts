import service from "@/utils/request";
import { defineStore } from "pinia";

export const useUserStore = defineStore('userID', () => {
    const userId = ref()
    const setUserId = (currentUserID: int)=>{
        userId.value = currentUserID
    }

    const personInfo = reactive({
        id: '',
        idCard: '',
        userName: '',
        gender: '',
        phone: '',
        address: '',
        email: '',
        communityName: '',
        buildingNumber: '',
        unitNumber: '',
        doorNumber: '',
        parkingNumber: '',
        securityCardNumber: '',
        emergencyContact: '',
        emergencyContactPhone: '',
        avatar_path: '',
        faceInfo_path: '',
        role: '',}
    )
    const saveUserData = (userInfo:any) => { 
        for (const key in userInfo) {
            personInfo[key] = userInfo[key];
        }
        localStorage.setItem('role', personInfo.role)
    }
    const getUserData = async() => {
        const personalInfo = await service({
        url: '/user/getPersonalInfo',
        method: 'POST',
        data: { userID: personInfo.id },
        })
        Object.assign(personInfo,personalInfo)
    }
    const delData = () => {
        userId.value=0
       Object.keys(personInfo).forEach(key => {
            personInfo[key] = '';
    });
    }
    return {userId,setUserId,saveUserData,personInfo,getUserData,delData}
}, {
    persist: {
        key: 'userID',
        storage: sessionStorage
    }
})

