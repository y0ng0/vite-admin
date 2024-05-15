<script setup>
import { storeToRefs } from 'pinia';
import { useCommonStore } from '@/store/common';
import { computed, onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router'; // 引入路由配置
import IconImg from '@/components/common/IconImg.vue';
import logoImg from '@/assets/imgs/logo.svg';
import logo from '@/assets/imgs/logo1.png';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const commonStore = useCommonStore();

const { menuNavCollapse } = storeToRefs(commonStore);

const isCollapse = computed(() => {
  return menuNavCollapse.value;
});

const emit = defineEmits(['checkRoutes']);


const handleSelect = (index) => {
  switch (index) {
    case '1':
      router.push('/user');
      break;
    case '2':
      router.push('/product');
      break;
    case '3':
      router.push('/category');
      break;
    case '4':
      router.push('/order');
      break;
    default:
      break;
  }
};

const handleClose = () => {
  console.log('close');
};

const handleOpen = () => {
  console.log('open');
};

</script>

<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    active-text-color="rgba(255,255,255,1)"
  >
  <el-menu-item index="1">
    <el-icon><icon-menu /></el-icon>
    <template #title>用户管理</template>
  </el-menu-item>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>商品管理</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><document /></el-icon>
      <template #title>分类管理</template>
    </el-menu-item>
    <!-- <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>订单管理</template>
    </el-menu-item> -->
  </el-menu>
</template>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  user-select: none;
}

.el-menu--vertical {
  min-height: 100vh;

  .el-menu-item {
    font-weight: bold;
  }

  .el-menu-item.is-active {
    background-color: rgba(67, 76, 93, 0.6);
  }
}
.menu-header {
  display: flex;
  justify-content: center;
  align-items: center;
  .menu-logo {
    height: 36px;
    width: 180px;
    margin-right: 10px;
  }
}
</style>