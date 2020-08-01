<template>
  <div id="login">
    <!-- 內容區 -->
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current':item.current}"
          @click="toggleMenu(item)"
        >{{item.txt}}</li>
      </ul>
      <!-- form 表單 start-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label>郵箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密碼</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-if = "model === 'register'">
          <label>重复密碼</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>驗證碼</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">獲取驗證碼</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="item-form">
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stripscript, validateEmail, validatePass,vCode } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    //驗證驗證碼
    var validateCode = (rule, value, callback) => {
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      
      if (value === "") {
        callback(new Error("請輸入驗證碼"));
      } else if (vCode(value)) {
        callback(new Error("驗證碼格式有誤"));
      } else {
        callback();
      }
    };

    //驗證用戶名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("請輸入用戶名"));
      } else {
        if (validateEmail(value)) {
          callback("用戶名格式有誤");
        }
        callback();
      }
    };
    //驗證密碼
    var validatePassword = (rule, value, callback) => {
      // console.log(stripscript(value));
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (validatePass(value)) {
        callback(new Error("密碼為6至20位數字+字母"));
      } else {
        callback();
      }
      
    };
     //验证重复密码
      var validatePasswords = (rule, value, callback) => {
      // console.log(stripscript(value));
      //隐藏元素会出现bug v-show 
      //v-if 删除dom元素
      if (this.model === 'login') callback();
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (this.ruleForm.password != value) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
      
    };
    return {
      menuTab: [
        { txt: "登錄", current: true, type: 'login' },
        { txt: "註冊", current: false, type: 'register' }
      ],
      model:'login',
      ruleForm: {
        username: "",
        password: "",
        code: "",
        passwords:""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
      }
    };
  },
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach(elem => {
        elem.current = false;
      });

      this.model = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #efff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #efff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
