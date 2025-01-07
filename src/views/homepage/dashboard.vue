<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card class="user-card">
        <div class="user-info">
          <el-avatar
            :size="120"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <div class="user-info-cont">
            <h1 class="username">{{ username }}</h1>
            <p class="userrole">{{ role }}</p>
          </div>
        </div>
        <div class="user-info-list">
          <p class="usertime">上次登陆时间<span>2024/12/16 12:00:00</span></p>
          <p class="useraddr">上次登陆地点<span>广东汕头</span></p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-carousel height="252px">
        <el-carousel-item v-for="item in imageList" :key="item">
          <el-image
            style="width: 100%; height: 100%"
            :src="item"
            alt=""
            fit="fill"
          />
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card shadow="hover"
        ><div ref="chartAi" style="height: 400px"></div
      ></el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="hover"
        ><div ref="chartCommu" style="height: 400px"></div
      ></el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import img1 from "@/assets/img/lunbo1.png";
import img2 from "@/assets/img/lunbo2.png";
import img3 from "@/assets/img/lunbo3.png";
import { useUserStore } from "@/stores/userdata";
import * as echarts from "echarts";
import { nextTick, onMounted, ref } from "vue";
const userStore = useUserStore();
const username = userStore.personInfo.userName;
const role = userStore.personInfo.role == "1" ? "普通用户" : "超级管理员";
const imageList = [img1, img2, img3];
// 基于准备好的dom，初始化echarts实例
const chartAi = ref(null);
let chartInstance = null;
// 绘制图表
// 初始化ECharts实例并设置配置项（这里以折线图为例，但可灵活替换）
onMounted(() => {
  chartInstance = echarts.init(chartAi.value);
  const option = {
    // 这里是ECharts的配置项，可以根据需要绘制不同类型的图表
    title: {
      text: "AI管家访问量",
    },
    tooltip: {},
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    yAxis: {},
    series: [
      {
        name: "数据系列",
        type: "bar", // 这里可以是'line'、'bar'、'pie'等，根据图表类型选择
        data: [120, 200, 150, 80, 70, 100],
      },
    ],
  };
  chartInstance.setOption(option);
});
// 基于准备好的dom，初始化echarts实例
const chartCommu = ref(null);
let commuInstance = null;
// 绘制图表
// 初始化ECharts实例并设置配置项（这里以折线图为例，但可灵活替换）
onMounted(() => {
  commuInstance = echarts.init(chartCommu.value);
  const option = {
    // 这里是ECharts的配置项，可以根据需要绘制不同类型的图表
    title: {
      text: "小区人流量",
    },
    tooltip: {},
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    yAxis: {},
    series: [
      {
        name: "数据系列",
        type: "line", // 这里可以是'line'、'bar'、'pie'等，根据图表类型选择
        data: [120, 200, 150, 80, 70, 100],
      },
    ],
  };
  commuInstance.setOption(option);
});
</script>
<style scoped>
.el-row {
  padding: 15px;
}
.el-col {
}
.user-card {
  height: 250px;
}
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid gray;
}
.user-info-cont {
  padding-left: 50px;
}
.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
.user-info-list span {
  margin-left: 70px;
}
</style>
