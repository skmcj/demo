## 翻页时钟🕐

<div align="center">
    <img src="https://static.ltgcm.top/md/20240331165326.gif" alt="switch" style="max-width: 420px;border-radius: 12px;" />
</div>




### 环境

![vue3](https://img.shields.io/badge/-Vue3-c0a483?logo=vuedotjs&logoColor=4FC08D)  +  ![Ts](https://img.shields.io/badge/-Typescript-b0cf95?logo=typescript&logoColor=3178C6)   +  ![scss](https://img.shields.io/badge/-Scss-93afc9?logo=sass&logoColor=CF649A) 

### 属性

- `showMode` — 显示模式(可选)，默认都显示
  - 用三位二进制分别代表时分秒的显隐(1-显|0-隐)
    - 如：`0b011` 表示仅显示分和秒
  - 显示模式决定计时模式(按分|秒)
    - 如果有显示秒，就按秒计时，没有就按分计时
- `timeMode` — 时间模式(可选)，默认为24小时制
  - `12|24`小时制，选`12`时右侧会有`AM|PM`标识
- `showTag` — 是否显示标签(可选)，默认为显示
- `type` — 组件类型(可选)，默认为时钟
  - `clock|time` <=> 时钟 | 计时器
- `mode` — 翻页方向(可选)，默认为向下翻
  - `up|down` <=> 向上|下翻

### 使用

将`components`内的文件复制到`vue3`项目下的`src`目录内

```vue
<template>
  <!-- 使用示例 -->
  <main>
    <FlipClock />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FlipClock from './components/FlipClock.vue';
</script>
```

