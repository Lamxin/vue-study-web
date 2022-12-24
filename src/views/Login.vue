<template>
  <div id="app">
    <kForm ref="loginForm" :model="userInfo" :rules="rules">
      <KFormItem label="用户名" prop="userName">
        <KInput v-model="userInfo.userName"  placeholder="请输入用户名"/>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="userInfo.password" type="password" placeholder="请输入密码" />
      </KFormItem>
      <KFormItem>
        <button @click="login">登录</button>
      </KFormItem>
    </kForm>
    <router-view></router-view>
  </div>
</template>

<script>
import KInput from "@/components/KForm/KInput.vue"
import KFormItem from "@/components/KForm/KFormItem.vue"
import KForm from '@/components/KForm/KForm.vue'

export default {
  name: 'Login',
  data(){
    return {
      userInfo: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{required: true, message:'请输入用户名'}],
        password: [{required: true, message: '请输入密码'}]
      }
    }
  },
  components: {
    KInput,
    KFormItem,
    KForm
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        const notice = this.$message({
          title: '登录',
          message: valid ? '登录成功': '验证失败'
        })
        notice.show()
      })
    }
  }
}
</script>

