<template>
  <div class="login-page">
    <canvas id="login-background"></canvas>
    <!-- 开启动画 -->

    <div class="ms-login">
      <div class="ms-title">和平社区欢迎您</div>
      <el-form
        ref="login"
        :model="form"
        :rules="ruleLoginForm"
        class="ms-content"
      >
        <el-form-item prop="username" required>
          <el-input v-model="form.username">
            <template #prepend>
              <el-button
                ><el-icon><User /></el-icon
              ></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" required>
          <el-input type="password" v-model="form.password">
            <template #prepend>
              <el-button
                ><el-icon><Lock /></el-icon
              ></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.captcha" placeholder="输入验证码" required />
          <img style="margin: 10px auto; margin-bottom: 0" :src="captchaUrl" />
          <el-icon size="25" @click="refreshCaptcha"><Refresh /></el-icon>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button type="primary" @click="navToRegister">注册</el-button>
        </div>
        <p class="login-tips">Tips :若未注册请点击注册!</p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/userdata";
import service from "@/utils/request";
import { getLoginFormRules } from "@/utils/rules";
import { Refresh } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { onMounted, reactive, ref } from "vue";

interface LoginForm {
  username: string;
  password: string;
  captcha: string;
}
// 获取组件实例 FormInstance表单实例类型，用于引用表单对象，以便调用表单方法如验证和重置
const login = ref<FormInstance>();
const form = reactive<LoginForm>({
  username: "admin",
  password: "1234",
  captcha: "1234",
});
// 表单校验规则 FormRules
const ruleLoginForm: FormRules = getLoginFormRules(form);

// 生成验证码
const captchaUrl = ref();
const captcha = async () => {
  const captchaResult = await service({
    url: "/captcha",
    method: "POST",
  });
  captchaUrl.value = captchaResult;
};
// 刷新二维码
function refreshCaptcha() {
  captcha();
}
onMounted(() => {
  captcha();
});

function handleLogin() {
  // 表单校验
  login.value.validate(async (vaild) => {
    if (vaild) {
      const loginResult = await service({
        url: "/login",
        method: "POST",
        data: form,
      });
      if (loginResult.code == 200) {
        localStorage.setItem("Token", loginResult.data.token);
        //  console.log(loginResult.data.userInfo.id)
        const userStore = useUserStore();
        userStore.saveUserData(loginResult.data.userInfo)
        userStore.setUserId(loginResult.data.userInfo.id);
        localStorage.setItem("username", loginResult.data.userInfo.userName);
        router.push("/");
      } else if (loginResult.code == 403) {
        alert("验证错误");
      } else if (loginResult.code == 2023) {
        alert("用户名或密码错误");
      } else if (loginResult.code == 2020) {
        alert("用户名不存在，请先注册");
      }
    } else {
      alert("校验不通过");
    }
  });
}
function navToRegister() {
  //注册页
  router.push("/register");
}
</script>

<style scoped>
@import url("./index.less");
</style>
