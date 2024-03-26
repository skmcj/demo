## 昼夜变换按钮🔳

<div align="center">
    <img src="https://static.ltgcm.top/md/20240326170303.png" alt="switch" style="max-width: 420px;border-radius: 12px;" />
</div>



### 环境

![vue3](https://img.shields.io/badge/-Vue3-c0a483?logo=vuedotjs&logoColor=4FC08D)  +  ![Ts](https://img.shields.io/badge/-Typescript-b0cf95?logo=typescript&logoColor=3178C6)   +  ![scss](https://img.shields.io/badge/-Scss-93afc9?logo=sass&logoColor=CF649A) 

### 使用

将`components`内的文件复制到`vue3`项目下的`src`目录内

```vue
<template>
  <!-- 使用示例 -->
  <main>
    <SMSwitch v-model="isDark" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SMSwitch from './components/SMSwitch.vue';

const isDark = ref(false);
</script>

<style lang="scss"></style>
```

