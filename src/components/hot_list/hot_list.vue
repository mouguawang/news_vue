<template>
  <div class="hot_list">
    <div class="title">头条热榜</div>
    <div class="datalist">
      <div class="article" v-for="(article, index) in hot_news" :key="article.newsId" @click="goto_hotnews(article.newsId, article.classification, article.author)">
        <div class="rank">{{ index + 1 }}</div>
        <div class="article_title">{{ article.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    name:'hot_list',
    data(){
      return{
        
      }
    },
    methods:{
      goto_hotnews(id, cateId, author){
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
        'hot_news','account'
      ])
    },
    beforeMount(){
      this.$store.commit('get_hotnews')
    }
}
</script>

<style scoped>
.hot_list{
  width: 25%;
  height: 370px;
  background-color: #fff;
  border: 4px solid white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  position: sticky;
  top: 25px;
}
.title{
  color: #222;
  margin-bottom: 12px;
  margin-left: 8px;
  margin-top: 8px;
}
.datalist{
  width: 100%;
}
.article{
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.article_title{
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #222;
  transition: all 0.3s;
}
.article_title:hover{
  color:#1a73e8;
  cursor: pointer;
}
.rank{
  margin-right: 16px;
}
.article:nth-child(1) .rank{
  color: #ff403a;
}
.article:nth-child(2) .rank{
  color: #ff9500;
}
.article:nth-child(3) .rank{
  color: #fc0;
}
</style>