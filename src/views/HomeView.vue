<script setup lang="ts">
import axios from 'axios';
import {ref} from 'vue';
const msg = ref('');
axios.get('http://127.0.0.1:5000/hello/').then(res=>{msg.value=res.data})

</script>

<template>
  <main>
    <h1>Message: {{ msg }} </h1>
  </main>
</template>
