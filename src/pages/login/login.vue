<template>
  <div class="login">
    <div class="login_container">
      <div class="logo">News Recommmendation</div>
      <div class="login_div">
        <div class="login_div_container">
          <div class="login_div_container2" ref="login_div_container2">
            <div class="login_top">
              <div class="login_top_title">欢迎使用</div>
            </div>
            <div class="login_all_container">
              <div class="login_input">
                <div class="account_input">
                  <input type="text" required id="account_input" ref="account_input" placeholder="请输入你的账号" @input="check()">
                </div>
                <div class="password_input">
                  <input type="text" required id="password_input" ref="password_input" placeholder="请输入你的密码" @input="check()">
                </div>
                <span class="check_error" ref="check_error"></span>
                <div class="login_button">
                  <button class="btn btn_disabled" disabled="disabled" type="button" ref="btn" @click="login()">登录</button>
                </div>
              </div>
            </div>
          </div>
          <div class="registe_div_container" ref="registe_div_container">
            <div class="login_top">
              <div class="login_top_title">注册</div>
            </div>
            <div class="login_all_container">
              <div class="login_input">
                <div class="registe_account_input">
                  <input type="text" required id="registe_account_input" placeholder="请输入你的账号" ref="registe_account_input" @input="check2()">
                </div>
                <div class="registe_password_input">
                  <input type="text" required id="registe_password_input" placeholder="请输入你的密码" ref="registe_password_input" @input="check2()">
                </div>
                <div class="registe_button">
                  <button class="registe_btn btn_disabled" ref="registe_btn" disabled="disabled" type="button" @click="registe()">注册</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="login_div_bottom" ref="login_div_bottom">
          <span>还没有账号？</span>
          <button type="button" class="registe" @click="goto_registe()">立即注册</button>
        </div>
      </div>
    </div>
    <div class="introduce">
      <div class="right-title">基于Spark的新闻推荐系统</div>
      <div class="right-title">蒋逸凡</div>
      <div class="right-title">8008120423</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  data(){
    return{}
  },
  methods:{
    goto_registe(){
      this.$refs.login_div_container2.style.display = 'none'
      this.$refs.login_div_bottom.style.display = 'none'
      this.$refs.registe_div_container.style.display = 'flex'
    },
    check(){
      var account = this.$refs.account_input.value
      var password = this.$refs.password_input.value
      if(account.length < 1 || password.length < 1){
        this.$refs.btn.disabled = 'disabled'
        this.$refs.btn.classList.add('btn_disabled')
      }else{
        this.$refs.btn.disabled = ''
        this.$refs.btn.classList.remove('btn_disabled')
      }
    },
    check2(){
      var registe_account = this.$refs.registe_account_input.value
      var registe_password = this.$refs.registe_password_input.value
      if(registe_account.length < 1 || registe_password.length < 1){
        this.$refs.registe_btn.disabled = 'disabled'
        this.$refs.registe_btn.classList.add('btn_disabled')
      }else{
        this.$refs.registe_btn.disabled = ''
        this.$refs.registe_btn.classList.remove('btn_disabled')
      }
    },
    login(){
      var account = this.$refs.account_input.value
      var password = this.$refs.password_input.value
      var check_error = this.$refs.check_error
      axios.get('http://localhost:8088/login?account='+account+'&password='+password).then(
        res => {
          // console.log(res)
          if(res.data=='1'){
            this.$store.commit('get_account_password', [account, password])
            // console.log(this.account+','+this.password)
            check_error.innerHTML = ''
            this.$router.push({name: 'home'})
          }else{
            check_error.innerHTML = '你输入的账号或密码不正确，请重新输入。'
          }
        }
      )
    },
    registe(){
      var registe_account = this.$refs.registe_account_input.value
      var registe_password = this.$refs.registe_password_input.value
      axios.get('http://localhost:8088/registe?registe_account='+registe_account+'&registe_password='+registe_password).then(
        res => {
          // console.log(res)
          this.$store.commit('get_account_password', [registe_account, registe_password])
          // console.log(this.account+','+this.password)
          this.$router.push({name: 'home'})
        }
      )
    }
  },
  computed:{
    ...mapState([
      'account','password'
    ])
  }
}
</script>

<style scoped>
button{
  border: none;
  background: transparent;
  border-color: transparent;
  transition: color .1s ease-in,background-color .1s ease-in,border-color .1s ease-in,width .2s ease-in;
}
.login{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.login_container{
  width: 78%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.introduce{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 22%;
  justify-content: center;
  align-items: center;
  align-content: center;
  min-width: 450px;
  background: #235bda;
  background-image: url(./images/login2.jpg);
  background-repeat: no-repeat;
}
.right-title{
  width: 80%;
  margin: 0 auto;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  font-stretch: normal;
  line-height: 3;
  color: #fff;
  text-align: left;
  letter-spacing: normal;
}
.logo{
  font-size: 22px;
  font-family:'Times New Roman', Times, serif;
  color: #1a73e8;
  width: 100%;
  height: 15%;
  margin-top: 20px;
  margin-left: 80px;
}
.login_div{
  width: 100%;
  height: 85%;
  display:flex;
  flex-direction: column;
  align-items: center;
}
.login_div_container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
}
.login_div_bottom{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
  /* height: 20%; */
  font-size: 18px;
  color: #646a73;
}
.registe{
  font-size: 18px;
  color: #3370ff;
  cursor: pointer;
}
.registe:hover{
  color: #4e83fd;
}
.login_div_container2, .registe_div_container{
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  min-width: 500px;
  height: 90%;
  background-color: #fff;
  color: #646a73;
  transition: all .2s;
  padding-left: 60px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid #dee0e3;
  box-shadow: 0 4px 8px rgba(31,35,41,.03), 0 3px 6px -6px rgba(31,35,41,.05), 0 6px 18px 6px rgba(31,35,41,.03);
}
.registe_div_container{
  display: none;
}
.login_top{
  display: flex;
  height: 10%;
  width: 100%;
  align-items: center;
}
.login_top_title{
  margin-top: 30px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  font-size: 30px;
  color: #1f2329;
  font-weight: 600;
  line-height: 30px;
}
.login_all_container{
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-between;
}
.login_input{
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* align-items: center; */
  align-content: flex-start;
  margin-top: 30px;
}
.account_input, .password_input, .registe_account_input, .registe_password_input{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  border-width: 1px;
  line-height: 24px;
  border-top: 2px solid #d0d3d6;
  border-right: 2px solid #d0d3d6;
  border-left: 2px solid #d0d3d6;
  border-bottom: 2px solid #d0d3d6;
  border-radius: 6px;
  transition: all .2s linear;
  padding: 5px;
  font-size: 18px;
  height: 50px;
  width: 90%;
  color: #646a73;
}
.account_input:hover, .password_input:hover, .registe_account_input:hover, .registe_password_input:hover{
  border-color: #99b8ff;
}
input{
  width: 100%;
  height: 80%;
  border: none;
  outline: none;
  padding: 0;
  flex: 1;
  overflow: hidden;
  background-color: transparent;
  margin: 0;
  color: #1f2329;
  min-width: 0;
  text-overflow: ellipsis;
  font-size: 20px;
}
.login_button, .registe_button{
  margin-top: 22px;
  width: 90%;
  height: 55px;
}
.btn, .registe_btn{
  width: 100%;
  height: 100%;
  border-radius: 6px;
  min-width: 96px;
  cursor: pointer;
  outline: none;
  border: 1px solid #fff;
  transition: color .1s ease-in,background-color .1s ease-in,border-color .1s ease-in,width .2s ease-in;
  background-color: #3370ff;
  color: #fff;
  font-size: 20px;
}
.btn:hover, .registe_btn:hover{
  background-color: #4e83fd;
}
.btn_disabled{
    cursor: not-allowed;
    background-color: #bbbfc4;
}
.btn_disabled:hover{
    background-color: #bbbfc4;
}
.check_error{
  color: #F54A45;
}
</style>