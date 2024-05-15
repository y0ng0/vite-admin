<script setup>
    import { onMounted, ref } from "vue";
    import { User, Lock } from "@element-plus/icons-vue";
    import { login as loginApi} from "../api/user";
    import { useRouter } from "vue-router";
    import { useUserStore } from "../store/user";
    import router from '@/router'; // 引入路由配置
    const userStore = useUserStore();
  
    const { changeLoginStatus } = userStore;
    const loginModel = ref({
      email: "",
      password: "",
    });
    const loginFormRef = ref(null);
  
    const rules = {
      email: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, message: "密码长度不能小于6位", trigger: "blur" },
      ],
    };
  
    const handleConfirm = () => {
      loginFormRef.value.validate((valid, error) => {
        if (valid) {
          // 登陆成功后的操作
          login();
        } else {
          return false;
        }
      });
    };
  
    const login = async () => {
      try {
        const res = await loginApi(loginModel.value);
        if (res.code === 0) {
          router.push('/user');
        } else {
          refresh();
          loginModel.value.inputIdentifyCode = "";
        }
      } catch (error) {
        console.log(error);
      }
    }; 
  </script>
  
  <template>
    <div class="mask">
      <div class="box">
        <div class="title-img">
          <img src="../assets/imgs/logo.png" alt="" height="103" width="456" />
        </div>
        <div class="input-box">
          <el-form :rules="rules" ref="loginFormRef" :model="loginModel">
            <el-form-item prop="email">
              <el-input v-model="loginModel.email" clearable placeholder="用户名" :prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input :prefix-icon="Lock" v-model="loginModel.password" type="password" show-password clearable
                placeholder="密码"></el-input></el-form-item>
            <div class="footer">
              <el-button type="primary" class="btn" @click="handleConfirm">登陆</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped lang="less">
    .mask {
      height: 98vh;
      background-color: #fff;
    }
  
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -200px 0 0 -250px;
      width: 500px;
      height: 400px;
      border-radius: 4px;
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    .input-box {
      margin-top: 24px;
      width: 70%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  
    .input-box .btn {
      margin-top: 24px;
    }
  
    .identify-code {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
  
      .link {
        text-decoration: underline;
        color: #409eff;
        font-size: 12px;
      }
    }
  </style>