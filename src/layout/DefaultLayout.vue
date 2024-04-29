<template>
    <div class="content-box">
      <MenuNav @checkRoutes="toDefault"></MenuNav>
      <div :class="['content', menuNavCollapse ? 'menu-close' : 'menu-open']">
        <TopNav></TopNav>
        <div class="page-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/store/user';
  import { useCommonStore } from '@/store/common';
  
  import MenuNav from '@/components/common/MenuNav.vue';
  import TopNav from '@/components/common/TopNav.vue';
  const router = useRouter();
  const commonStore = useCommonStore();
  const { menuNavCollapse } = storeToRefs(commonStore);
  
  
  const toDefault = () => {
    let hasDefault = false;
    router.getRoutes().forEach((route) => {
      if (route.meta.default) {
        router.push(route.path);
        hasDefault = true;
      }
    });
    if (!hasDefault) {
      router.push('/');
    }
  };
  
  </script>
  
  <style scoped lang="less">
  .content-box {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
  
    .content {
      height: 100%;
      width: 100%;
      padding-top: 56px;
      position: relative;
    }
  
    .page-content {
      height: 100%;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 10px;
      overflow: auto;
    }
  
    .menu-close {
      width: calc(100% - 60px);
    }
  
    .menu-open {
      width: calc(100% - 200px);
    }
  }
  </style>
  
  