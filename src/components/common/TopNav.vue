<script setup>
import UserMenu from '@/components/common/UserMenu.vue';
import { useCommonStore } from '@/store/common';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();
import { onMounted, reactive, ref } from 'vue';

const commonStore = useCommonStore();
const { updateMenuNavCollapse, updateSelectedApp } = commonStore;
const { menuNavCollapse } = storeToRefs(commonStore);
const userStore = useUserStore();
const { userName } = storeToRefs(userStore);
const { isLogin } = storeToRefs(userStore);
const handleFold = () => {
  updateMenuNavCollapse(!menuNavCollapse.value);
};
const visible = ref(false);
const changepwdForm = ref({
  oldpassword: null,
  newpassword: null,
  confirmpwd: null,
});
const changepwdFormRef = ref(null);

const loading = ref(false);

const validatePass = (rule, value, callback) => {
  if (value === '' || !value) {
    callback(new Error('Please input the new password'));
  } else {
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (value === '' || !value) {
    callback(new Error('Please input the password again'));
  } else if (value !== changepwdForm.value.newpassword) {
    callback(new Error('Two inputs don\'t match!'));
  } else {
    callback();
  }
};
const rules = reactive({
  oldpassword: [{ required: true,message: 'Pleace input the old password' }],
  newpassword: [{ validator: validatePass,trigger: 'blur' }],
  confirmpwd: [{ validator: validatePass2, trigger: 'blur' }]
});

const logoutAccount = async () => {
  try {
    const { code ,msg } = await logout({ email: userName.value });
    if (code === 0) {
      isLogin.value = false;
      showElMsg('logout success', 'success');
    } else {
      showElMsg(msg);
    }
  } catch (error) {
    console.log(error);
  }
  router.push({ path: '/login' });
  location.reload();
};

const changePwdAccount = async () => {
  console.log('111');
  try {
    loading.value = true;
    const { code } = await changePwd({ old_password: changepwdForm.value.oldpassword, new_password: changepwdForm.value.newpassword });
    loading.value =false;
    if (code === 0) {
      close();
      logoutAccount();
      showElMsg('chang password success, please login again', 'success');
    }
    console.log('修改密码');
  } catch (error) {
    console.log(error);
    loading.value = false;
    showElMsg(error.response.data?.msg);
  }
};
const handleCommand  = async (command) => {
  if (command === 'logout') {
    logoutAccount();
  } else if (command === 'changepwd') {
    visible.value = true;
  }
};

const cannel = () => {
  close();
};

const confirm = async () => {
  await changepwdFormRef.value.validate(valid => {
    if (valid) {
      changePwdAccount();
    }
  });
};

const close = () => {
  visible.value = false;
  changepwdFormRef.value.resetFields();
  changepwdForm.value = {
    oldpassword: null,
    newpassword: null,
    confirmpwd: null,
  };
};


</script>
<template>
  <div class="top-nav">
    <div class="left">
      <el-icon @click="handleFold" class="collapse">
        <Fold style="width: 24px; height: 24px" />
      </el-icon>
      <span class="env-text"></span>
    </div>
    <user-menu @command="handleCommand"></user-menu>
  </div>
  <el-dialog v-model="visible" width="500">
    <el-form label-width="150" ref="changepwdFormRef" :rules="rules" :model="changepwdForm">
      <el-form-item :label="旧密码" required prop="oldpassword">
        <el-input v-model="changepwdForm.oldpassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item :label="新密码" prop="newpassword" required>
        <el-input v-model="changepwdForm.newpassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item :label="确认密码"  prop="confirmpwd" required>
        <el-input v-model="changepwdForm.confirmpwd" type="password" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cannel">取消</el-button>
        <el-button @click="confirm" type="primary" :loading="loading">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less">
.top-nav {
  position: absolute;
  top: 0;
  height: 56px;
  left: 0;
  right: 0;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  align-items: center;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .env-text {
      font-size: 16px;
      font-weight: bold;
      color: red;
    }
  }
  .collapse {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
