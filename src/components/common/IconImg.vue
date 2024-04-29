<template>
  <div>
    <img :src="requireImg(imgName)" alt="" class="icon-img" />
  </div>
</template>
<script setup>
// 自定义菜单图标
const props = defineProps({
  imgName: {
    type: String,
    default: "logo",
  },
});
const requireImg = (imgName) => {
  // 动态导入menu对应的icon
  return new URL(`../../assets/imgs/${imgName}.png`, import.meta.url).href;
};
</script>
<style lang="less">
.icon-img {
  width: 18px;
  height: 18px;
}
</style>
