<template>
    <div class="myHeader">
      <div class="head1">
        <div class="n_title">News Recommmendation</div>
        <div class="search">
          <!-- <input type="text" class="input1" placeholder="搜索主题、地点和来源">
          <button class="btn">
            <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,
              9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,
              9.5S11.99,14,9.5,14S5,11.99,5,9.5z">
              </path>
              <path d="M0,0h24v24H0V0z" fill="none"></path>
            </svg>
          </button> -->
          蒋逸凡 8008120423 基于爬虫和Spark的新闻推荐系统
        </div>
        <div class="log_out" @click="logout()">登出</div>
      </div>
      <div class="classification">
        <div :class="{active:flag === '0'}" @click="changeFlag('0')">为您推荐</div>
        <div :class="{active:flag === '1'}" @click="changeFlag('1')">1:财经</div>
        <div :class="{active:flag === '2'}" @click="changeFlag('2')">2:科技</div>
        <div :class="{active:flag === '3'}" @click="changeFlag('3')">3:国际</div>
        <div :class="{active:flag === '4'}" @click="changeFlag('4')">4:体育</div>
        <div :class="{active:flag === '5'}" @click="changeFlag('5')">5:生活</div>
        <div :class="{active:flag === '6'}" @click="changeFlag('6')">6:思想</div>
        <div :class="{active:flag === '7'}" @click="changeFlag('7')">7:智库</div>
      </div>
    </div>
</template>
  
<script>
// import {ref} from 'vue'
// const flag = ref('')
// const changeFlag = (category) => {
//   flag.value = category
// }
import { mapState } from 'vuex';
export default {
    name: 'myHeader',
    computed:{
      ...mapState([
        'flag','account','password'
      ])
    },
    methods:{
      changeFlag(category){
        this.$store.commit('clean_news')
        this.$store.commit('clean_page')
        this.$store.commit('flag_change', category)
        this.$router.push({name:'home'})
      },
      logout(){
        this.$store.commit('clean_account_password')
        this.$router.push({name:'login'})
      }
    }
};
</script>
  
  <style scoped>
  .myHeader{
      top: 0;
      width: 100%;
      height: 110px;
      color: #5f6368;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      transition: all 0.3s;
      border-bottom: 1px solid #dadce0;
      position: fixed;
  }
  .head1{
    margin-top:10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    text-align: center;
  }
  .n_title{
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-family:'Times New Roman', Times, serif;
    color: #1a73e8;
  }
  .search {
  display: flex;
  height: 48px;
  width: 600px;
  background-color: #f1f3f4;
  border: 4px solid transparent;
  border-radius: 10px;
  font-size: 24px;
  margin-right: 140px;
  align-items: center;
}

.search .input1 {
  margin: 0;
  padding: 0;
  background-color: #f1f3f4;
  border: 1px solid transparent;
  width: 720px;
  font-size: 18px;
}
.input1:focus{
  outline-color: #1a73e8;
}

.btn {
  border: 0;
  cursor: pointer;
  background-color: #f1f3f4;
}
.log_out{
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s;
}
.log_out:hover{
  color: #1a73e8;
}
.classification{
    margin-top:10px;
    width: 640px;
    height: 40px;
    font-size: 16px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
  .classification div{
      transition: all 0.3s;
  }
  .classification div:hover{
      color: #1a73e8;
      cursor: pointer;
  }
  .active{
    color: #1a73e8;
    border-bottom: 2px solid #1a73e8;
  }
  </style>