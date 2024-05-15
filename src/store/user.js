import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useUserStore = defineStore('userStore', () => {
  const loginStatus = ref(false); // 登录状态

  const changeLoginStatus = (status) => {
    loginStatus.value = status;
  };

  return {
    loginStatus,
    changeLoginStatus,
  };
});