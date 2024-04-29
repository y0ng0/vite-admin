<script setup>
import { storeToRefs } from 'pinia';
import { useCommonStore } from '@/store/common';
import { computed, onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router'; // 引入路由配置
import IconImg from '@/components/common/IconImg.vue';
import logoImg from '@/assets/imgs/logo.svg';
import logo from '@/assets/imgs/logo1.png';

const commonStore = useCommonStore();

const { menuNavCollapse } = storeToRefs(commonStore);

const isCollapse = computed(() => {
  return menuNavCollapse.value;
});

const emit = defineEmits(['checkRoutes']);

const route = useRoute();



const generateMenu = () => {
  return router
    .getRoutes()
    .map((route) => ({
      index: route.path, // 跳转路由
      key: route.path.replace('/', ''),
      title: route.name,
      icon: route.meta && route.meta.icon ? route.meta.icon : 'document',
      children: route.children.length
        ? route.children.map((childRoute) => ({
          index: `/${route.path.replace('/', '')}/${childRoute.path.replace(
            '/',
            ''
          )}`, // 跳转路由
          key: `${route.path.replace('/', '')}-${childRoute.path.replace(
            '/',
            ''
          )}`,
          title: childRoute.name,
          icon: childRoute.meta.icon || 'document',
        }))
        : [],
    }));
};

const menuItems = ref([]);

onMounted(() => {
  generateMenu();
  console.log(menuItems.value);
})

</script>

<template>
  <el-menu
    :default-active="router.currentRoute.value.path"
    background-color="#001529"
    text-color="rgba(255,255,255,0.6)"
    active-text-color="rgba(255,255,255,1)"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :router="true"
  >
    <el-menu-item
      style="
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 20px;
        color: #fff;
      "
    >
      <img v-if="isCollapse" :src="logo" alt="" width="24" height="24" />
      <template #title>
        <div class="menu-header">
          <img :src="logoImg" alt="" class="menu-logo" width="432" height="60"/>
        </div>
      </template>
    </el-menu-item>
    <template v-for="item in menuItems" :key="item.key">
      <!-- 二级菜单 -->
      <el-sub-menu
        v-if="item.children && item.children.length"
        :index="item.index"
      >
        <template #title>
          <el-icon>
            <IconImg :imgName="item.icon" />
          </el-icon>
          {{ isCollapse ? "" : item.title }}
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.key"
          :index="child.index"
        >
          <el-icon>
            <IconImg :imgName="item.icon" />
          </el-icon>
          {{ child.title }}
        </el-menu-item>
      </el-sub-menu>
      <!-- 一级菜单项 -->
      <el-menu-item v-else :index="item.index">
        <el-icon>
          <IconImg :imgName="item.icon" />
        </el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </template>
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
    height: 24px;
    width: 180px;
    margin-right: 10px;
  }
}
</style>