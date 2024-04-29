import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommonStore = defineStore('commonStore', () => {
  const menuNavCollapse = ref(false); // 左侧菜单栏是否收起flag
  const updateMenuNavCollapse = (bool) => {
    menuNavCollapse.value = bool || false;
  };


  return {
    menuNavCollapse,
    updateMenuNavCollapse
  };
});
