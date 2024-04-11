<template>
  <div class="home" ref="home">
    <myHeader></myHeader>
    <div class="home_title">{{ flag_title }}</div>
    <div class="home_content" ref="home_content">
      <div class="home_list" ref="home_list">
        <div class="article" v-for="article in news" :key="article.newsId" @click="goto_news(article.newsId, article.classification, article.author)">
          <div class="article_info">
            <div class="article_title">{{ article.title }}</div>
            <div class="article_info2">
              <div class="article_author">{{ article.author }}</div>
              <div class="article_time">{{ article.time }}</div>
              <div class="article_classification">类别：{{ article.classification }}</div>
            </div>
          </div>
          <div class="article_pic">
            <img :src="article.img_url" referrerpolicy="no-referrer" />
          </div>
        </div>
      </div>
      <hot_list></hot_list>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import hot_list from '../../components/hot_list/hot_list.vue'
import myHeader from '../../components/header/header.vue'
export default {
  name: "home",
  data() {
    return {

    };
  },
  components:{
    hot_list,
    myHeader
  },
  methods: {
    scroll(){
        let ref_label = this.$refs.home
        ref_label.onscroll = () => {
        let bottom_window1 = ref_label.scrollTop + ref_label.clientHeight;
        let bottom_window2 = ref_label.scrollHeight;
        // console.log(ref_label.scrollTop, ref_label.clientHeight,ref_label.scrollHeight);
        if (Math.abs(bottom_window1 - bottom_window2) <= 10){
          this.$store.commit('getNews')
        }
      }
    },
    goto_news(id, cateId, author){
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      const time = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds
      // console.log('account:'+this.account+this.password)
      axios.get('http://localhost:8088/read?userId='+this.account+'&time='+time+'&cateId='+cateId+'&author='+author+'&newsId='+id).then(
        res => {
          console.log(res)
          this.$router.push({name:'news', params:{id}})
        }
      )
    }
  },
  computed:{
    ...mapState([
      'flag', 'news', 'page', 'account','password'
    ]),
    flag_title(){
      if(this.flag == 0){
        return '为您推荐';
      }else if(this.flag == 1){
        return '财经';
      }else if(this.flag == 2){
        return '科技';
      }else if(this.flag == 3){
        return '国际';
      }else if(this.flag == 4){
        return '体育';
      }else if(this.flag == 5){
        return '生活';
      }else if(this.flag == 6){
        return '思想';
      }else if(this.flag == 7){
        return '智库';
      }
    }
  },
  watch:{
    flag: function(newVal){
      this.$store.commit('clean_news');
      this.$store.commit('clean_page');
      this.$store.commit('getNews');
    }
  },
  beforeMount() {
    this.$store.commit('getNews');
  },
  mounted() {
    this.scroll()
  },
};
</script>

<style scoped>
.home {
  color: #5f6368;
  margin-top: 110px;
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f8fc;
  overflow: scroll;
  /* position: relative; */
}
.home::-webkit-scrollbar {
  width: 0 !important;
}
.home_title{
  margin-top: 30px;
  margin-bottom: 30px;
  width: 75%;
  height: 60px;
  font-size: 28px;
  line-height: 1.1428571429;
  font-family:'Times New Roman', Times, serif;
  /* font-weight: 400; */
}
.home_content{
  display: flex;
  width: 100%;
  /* height: 800px; */
  justify-content: center;
}
.home_list {
  width: 50%;
  /* height: 800px; */
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 4px solid white;
  border-radius: 20px;
}
.article{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 14px;
  margin-left: 2px;
  margin-right: 2px;
  padding-bottom: 14px;
  border-bottom: 1px solid #dadce0;
}
.article_info{
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.article_title{
  font-size: 16px;
  color: #222;
  transition: all 0.3s;
}
.article_title:hover{
  color:#1a73e8;
  cursor: pointer;
}
.article_info2{
  display: flex;
  width: 65%;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.article_pic{
  width: 28%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
}
.article_pic img{
  width: 100%;
  height: 100%;
}
</style>