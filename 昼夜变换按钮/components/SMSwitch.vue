<template>
  <!-- 昼夜变换按钮 -->
  <label class="sm-switch">
    <input type="checkbox" v-model="isChecked" class="sm-switch-input" />
    <div class="sm-switch-main">
      <!-- 星空 -->
      <div class="sm-switch-stars">
        <Stars />
      </div>
      <!-- 云朵 -->
      <div class="sm-switch-clouds"></div>
      <!-- 圆 -->
      <div class="sm-switch-circle">
        <!-- 月 -->
        <div class="sm-switch-moon">
          <!-- 月坑 -->
          <div class="sm-switch-spot"></div>
          <div class="sm-switch-spot"></div>
          <div class="sm-switch-spot"></div>
        </div>
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Stars from './icons/Stars.vue';

interface SMSwitchProps {
  modelValue?: boolean;
}

const props = withDefaults(defineProps<SMSwitchProps>(), {
  modelValue: false
});

const isChecked = computed({
  get: () => {
    return props.modelValue;
  },
  set: val => {
    emits('update:modelValue', val);
  }
});

const emits = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.sm-switch-input {
  display: none;
}
.sm-switch {
  // 定义变量
  $size: 5px;
  $width: 33.75 * $size;
  $height: 15 * $size;
  $circleSize: 12.8 * $size;
  $lightBg: #3d7eae;
  $darkBg: #1d1f2c;
  $cloudC: #f3fdff;
  $cloudBgC: #aacadf;
  $circleLight: #ecca2f;
  $circleDark: #c4c9d1;
  $spotC: #959db1;
  .sm-switch-main {
    width: 100%;
    height: 100%;
    width: $width;
    height: $height;
    border-radius: calc($height / 2);
    box-shadow: 0 (-0.4 * $size) (0.4 * $size) rgba(0, 0, 0, 0.25),
      0 (0.4 * $size) (0.8 * $size) rgba(255, 255, 255, 0.94);
    overflow: hidden;
    position: relative;
    background-color: $lightBg;
    transition: background-color 0.3s ease-in-out;
  }
  .sm-switch-circle {
    cursor: pointer;
    position: absolute;
    z-index: 2;
    top: calc(($height - $circleSize) / 2);
    left: calc(($height - $circleSize) / 2);
    width: $circleSize;
    height: $circleSize;
    border-radius: calc($circleSize / 2);
    background-color: $circleLight;
    box-shadow: (0.4 * $size) (0.4 * $size) (0.4 * $size) 0 rgba(254, 255, 239, 0.61) inset,
      0 (-0.4 * $size) (0.4 * $size) 0 #a1872a inset;
    filter: drop-shadow((0.4 * $size) (0.75 * $size) (0.75 * $size) rgba(0, 0, 0, 0.25))
      drop-shadow(0 (0.4 * $size) (0.75 * $size) rgba(0, 0, 0, 0.25));
    transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);

    &::before {
      position: absolute;
      left: -0.3 * $circleSize;
      top: -0.3 * $circleSize;
      content: '';
      display: block;
      width: $circleSize * 1.6;
      height: $circleSize * 1.6;
      border-radius: $circleSize * 0.8;
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: inset 0 0 0 (20.25 * $size) rgba(255, 255, 255, 0.1),
        inset 0 0 0 (20.25 * $size) rgba(255, 255, 255, 0.1), 0 0 0 (3.75 * $size) rgba(255, 255, 255, 0.1),
        0 0 0 (7.5 * $size) rgba(255, 255, 255, 0.1);
      transition: 0.3s cubic-bezier(0, -0.02, 0.35, 1.17);
    }
    &:hover {
      left: calc(($height - $circleSize) / 2 + (1.25 * $size));
    }
  }
  .sm-switch-moon {
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: $circleDark;
      box-shadow: (0.4 * $size) (0.4 * $size) (0.4 * $size) 0 rgba(254, 255, 239, 0.61) inset,
        0 (-0.4 * $size) (0.4 * $size) 0 #969696 inset;
      transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
      transform: translateX($circleSize);
    }
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .sm-switch-spot {
    width: 0.32 * $circleSize;
    height: 0.32 * $circleSize;
    border-radius: 50%;
    background-color: $spotC;
    position: absolute;
    top: 45%;
    left: 18%;
    box-shadow: inset 0 (0.2 * $size) (0.4 * $size) 0 rgba(0, 0, 0, 0.25);
    transition: transform 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
    transform: translate(360%, -160%);
    &:nth-child(2) {
      width: 0.21 * $circleSize;
      height: 0.21 * $circleSize;
      top: 18%;
      left: 36%;
      transform: translate(600%, -240%);
    }
    &:nth-child(3) {
      width: 0.14 * $circleSize;
      height: 0.14 * $circleSize;
      top: 50%;
      left: 64%;
      transform: translate(800%, -300%);
    }
  }
  .sm-switch-clouds {
    position: absolute;
    bottom: -3.75 * $size;
    left: 1.8 * $size;
    width: 7.5 * $size;
    height: 7.5 * $size;
    border-radius: 50%;
    background-color: $cloudC;
    box-shadow: (-1.9 * $size) (-1.9 * $size) $cloudBgC, (7 * $size) (2.25 * $size) $cloudC,
      (3 * $size) (-0.75 * $size) $cloudBgC, (13 * $size) 0 $cloudC, (7.5 * $size) (-0.37 * $size) $cloudBgC,
      (17.7 * $size) (1.9 * $size) $cloudC, (12 * $size) (-1.9 * $size) $cloudBgC,
      (21.75 * $size) (-0.37 * $size) $cloudC, (15.75 * $size) 0 $cloudBgC, (27 * $size) (-1.9 * $size) $cloudC,
      (20.25 * $size) (-2.7 * $size) $cloudBgC, (27.75 * $size) (-10.5 * $size) 0 (2.7 * $size) $cloudC,
      (24 * $size) (-3.75 * $size) $cloudBgC, (24.75 * $size) (-12.75 * $size) 0 (2.7 * $size) $cloudBgC;
    transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  }
  .sm-switch-stars {
    position: relative;
    width: 100%;
    height: 100%;
    transform: translateY(-130%);
    transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
    svg {
      height: 50%;
      position: absolute;
      left: 12%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .sm-switch-input:checked + .sm-switch-main {
    // 点击按钮后的样式
    background-color: $darkBg;
    .sm-switch-circle {
      // $width - $circleSize - ($height - $circleSize) / 2
      // 简化后：19.85 * $size
      left: 19.85 * $size;
      // background-color: $circleDark;
      &:hover {
        // 19.85 * $size - 1.25 * $size
        left: 18.6 * $size;
      }
    }
    .sm-switch-moon {
      &::before {
        transform: translateX(0);
      }
    }
    .sm-switch-spot {
      transform: translate(0);
    }
    .sm-switch-stars {
      transform: translateY(0);
    }
    .sm-switch-clouds {
      transform: translateY(300%);
    }
  }
}
</style>
