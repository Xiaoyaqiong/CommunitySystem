<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <template #header>
          <div class="">
            <span>基础信息</span>
          </div>
        </template>
        <div class="user-msg">
          <div class="user-image">
            <el-avatar
              :size="120"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
          <div class="user-name">{{ username }}</div>
          <div class="user-addr">
            {{ buildingNumber }} - {{ unitNumber }} - {{ doorNumber }}
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <template #header>
          <div class="">
            <span>账户编辑</span>
          </div>
        </template>
        <div class="edit-form">
          <el-form
            ref="userInfo"
            :model="form"
            :rules="ruleUserInfo"
            label-position="right"
            label-width="80px"
          >
            <el-form-item label="用户名">
              {{ form.userName }}
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio label="男" value="男" />
                <el-radio label="女" value="女" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="栋数" prop="buildingNumber">
              <el-input v-model="form.buildingNumber"></el-input>
            </el-form-item>
            <el-form-item label="单元号" prop="unitNumber">
              <el-input v-model="form.unitNumber"></el-input>
            </el-form-item>
            <el-form-item label="房间号" prop="doorNumber">
              <el-input v-model="form.doorNumber"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="idCard">
              <el-input v-model="form.idCard"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dialogTableVisible = true"
                >更改密码</el-button
              >

              <el-button type="success" @click="changeUserInfo(userInfo)"
                >更改个人信息</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!-- 更改密码显示 -->
  <el-dialog title="更改密码" v-model="dialogTableVisible" width="30%">
    <el-form label-width="90px">
      <el-form-item label="旧密码：" required>
        <el-input type="password" v-model="pwdform.oldPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" required>
        <el-input type="password" v-model="pwdform.newPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePassword">确认更改</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "@/stores/userdata";
import service from "@/utils/request";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { getUserInfoForm } from "@/utils/rules";
const userStore = useUserStore();
const username = userStore.personInfo.userName;
const buildingNumber = userStore.personInfo.buildingNumber;
const unitNumber = userStore.personInfo.unitNumber;
const doorNumber = userStore.personInfo.doorNumber;

// 表单校验规则
const ruleUserInfo: FormRules = getUserInfoForm();
// 表单校验结果
const userInfo = ref<FormInstance>();

const form = reactive({
  gender: "",
  unitNumber: "",
  buildingNumber: "",
  doorNumber: "",
  userName: "",
  email: "",
  phone: "",
  idCard: "",
});
onMounted(() => {
  for (const key in userStore.personInfo) {
    form[key] = userStore.personInfo[key];
  }
});
const changeUserInfo = async (formEl: FormInstance) => {
  if (!formEl) return;
  await formEl.validate(async (vaild, fields) => {
    if (vaild) {
      const userInfoResult = await service({
        url: "/user/updateProfile",
        method: "POST",
        data: {
          gender: form.gender,
          unitNumber: form.unitNumber,
          buildingNumber: form.buildingNumber,
          doorNumber: form.doorNumber,
          phoneNumber: form.phone,
          userName: form.userName,
          email: form.email,
          id: userStore.personInfo.id,
        },
      });
      if (userInfoResult.code == 200) {
        ElMessage.success(userInfoResult.msg);
        userStore.getUserData();
      } else {
        ElMessage.info(userInfoResult.msg);
      }
    } else {
      ElMessage.info("请检查格式");
    }
  });
};

const dialogTableVisible = ref(false);
const pwdform = reactive({
  oldPwd: "",
  newPwd: "",
});
const changePassword = async () => {
  const res = await service({
    url: "/user/changePwd",
    method: "POST",
    data: {
      old_password: pwdform.oldPwd,
      new_password: pwdform.newPwd,
      user_id: userStore.personInfo.id,
    },
  });

  if (res.code == 200) {
    dialogTableVisible.value = false;
    ElMessage.success(res.msg);
  } else {
    ElMessage.info(res.msg);
  }
};
</script>
<style>
.el-row {
  padding: 15px;
}
.userinfo-contaniner {
  padding: 20px;
}
.user-msg {
  text-align: center;
  padding: 50px 0;
}
.user-name {
  margin: 10px 0;
  font-size: 25px;
}
.user-addr {
  font-size: 18px;
}
.edit-form {
  padding: 10px;
}
</style>
