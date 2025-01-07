<template>
  <div class="register-content">
    <canvas id="login-background"></canvas>
    <!-- 开启动画 -->
    <div class="ms-register">
      <div class="ms-title">用户注册</div>
      <el-form
        :model="param"
        ref="register"
        label-width="120px"
        class="ms-content"
        :rules="registerRlues"
      >
        <el-form-item prop="username">
          <template #label>
            <span class="FormItemLabel">用户名</span>
          </template>
          <el-input
            v-model="param.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <template #label>
            <span class="FormItemLabel">密码</span>
          </template>
          <el-input
            type="password"
            v-model="param.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <template #label>
            <span class="FormItemLabel">确认密码</span>
          </template>
          <el-input
            type="password"
            v-model="param.confirmPassword"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <!-- 其他需要用户填写的信息 -->

        <el-form-item label="手机号" prop="phone">
          <template #label>
            <span class="FormItemLabel">手机号</span>
          </template>
          <el-input v-model="param.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <template #label>
            <span class="FormItemLabel">性别</span>
          </template>
          <el-radio-group v-model="param.gender">
            <el-radio label="男" style="color: #fff" />
            <el-radio label="女" style="color: #fff" />
          </el-radio-group>
        </el-form-item>

        <div class="register-btn">
          <el-button type="primary" @click="submitForm()">注册</el-button>
          <el-button
            type="primary"
            @click="
              () => {
                router.go(-1);
              }
            "
            >返回上一层</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { ElMessage } from "element-plus";
import service from "../../utils/request";
import { getRegisterForm } from "../../utils/rules";
import lodash from "lodash";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/stores/userdata";

interface RegisterInfo {
  username: string;
  password: string;
  confirmPassword: string;
  // 添加其他需要用户填写的信息
  gender: string;
  phone: string;
  communityName: string;
  role: string;
  // avatar_path: string
  // faceInfo_path: string
}
const register = ref<FormInstance>();
const router = useRouter();
const param = reactive<RegisterInfo>({
  username: "",
  password: "123",
  confirmPassword: "123",
  gender: "",
  phone: "13450209670",
  role: "1",
  communityName: "默认1",
});
const registerRlues: FormRules = getRegisterForm(param);
const getRoleByName = (username: any) => {
  return lodash.includes(username, "admin") ? "0" : "1";
};
// 监听 username 字段的变化，当 username 变化时更新 role 字段的值
watch(
  () => param.username,
  (newValue) => {
    const newRole = getRoleByName(newValue);
    param.role = newRole;
  }
);
const submitForm = () => {
  register.value.validate(async (vaild) => {
    if (vaild) {
      const registerResult = await service({
        url: "/register",
        method: "POST",
        data: { registerInfo: param },
      });
      if (registerResult.code == "200") {
        localStorage.setItem("Token", registerResult.data.token);
        //  console.log(loginResult.data.userInfo.id)
        const userStore = useUserStore();
        userStore.saveUserData(registerResult.data.userInfo);
        userStore.setUserId(registerResult.data.userInfo.id);
        localStorage.setItem("username", registerResult.data.userInfo.userName);
        router.push("/");
      } else {
        ElMessage.error(registerResult.msg);
        console.log("abc");
      }
    }
  });
};
// const submitForm = () => {
//   register.value.validate(async (vaild) => {
//     if (valid) {
//       const registerResult = await service({
//         url: "/register",
//         method: "POST",
//         data: { registerInfo: param },
//       });

//       if (registerResult?.code == "200") {
//         ElMessage.success(registerResult?.msg || "注册成功");
//         localStorage.setItem("username", param.username);
//         localStorage.setItem("token", registerResult?.data?.token);
//         localStorage.setItem("role", registerResult?.userInfo?.userName);
//         router.replace("/");
//       } else {
//         ElMessage.error(registerResult?.msg || "注册失败，请联系管理员");
//         return false;
//       }
//     }
//   });
// };
</script>

<style>
.register-content {
  background-color: #2d3a4b;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}
.register-content canvas {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-color: #2d3a4b;
}
.FormItemLabel {
  color: #fff;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-register {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.register-btn {
  display: flex;
  text-align: center;
}
.register-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>
