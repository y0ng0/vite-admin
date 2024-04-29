import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useUserStore = defineStore('userStore', () => {
  const isLogin = ref(false);
  const updateIsLogin = (bool) => {
    isLogin.value = bool || false;
  };

  const userName = ref('');
  const updateUserName = (newVal) => {
    userName.value = newVal;
  };

  return {
    isLogin,
    updateIsLogin,
    userName,
    updateUserName
  };
});