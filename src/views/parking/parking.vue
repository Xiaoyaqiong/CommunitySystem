<template>
  <h1>{{ msg }}</h1>
</template>
<script setup lang="ts">
import service from "@/utils/request";
import { ref } from "vue";

const msg = ref();
async function displayMsg() {
  const msgResult = await service({
    url: "/parking",
    method: "get",
  });
  msg.value = msgResult.msg;
}
displayMsg();
// msg.value=msgResult.data
</script>
