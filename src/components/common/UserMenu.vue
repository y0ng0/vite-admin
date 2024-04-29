<template>
    <el-dropdown @command="handleCommand" class="dropdown">
      <span class="el-dropdown-link">
        <el-icon class="el-icon--left"><UserFilled /></el-icon>
        {{ userName }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu>
          <el-dropdown-item command="changepwd">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </template>
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '../../store/user';
  const userStore = useUserStore();
  const { userName } = storeToRefs(userStore);
  const emit = defineEmits(['command']);
  
  const handleCommand = (command) => {
    emit('command', command);
  };
  </script>
  
  <style lang="less" scoped>
  .el-dropdown-link {
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  </style>