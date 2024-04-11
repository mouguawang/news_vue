<template>
  <div class="news">
    <myHeader></myHeader>
    <div class="like_div">
        <button class="btn" @click="increment_like">
            <img src="./images/like.png">
        </button>
        <div class="likes_num">{{ news_detail.likes }}</div>
    </div>
    <div class="news_detail">
        <div class="news_title">{{ news_detail.title }}</div>
        <div class="news_from">
            <div class="news_time">{{ news_detail.time }}</div>
            <div class="news_author">来源：{{ news_detail.author }}</div>
            <div class="news_classification">类别：{{ news_detail.classification }}</div>
        </div>
        <div class="news_pic">
            <img :src="news_detail.img_url" referrerpolicy="no-referrer" />
        </div>
        <div class="news_content">{{ news_detail.content }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import myHeader from '../../components/header/header.vue'
export default {
    name:'news',
    data(){
        return{
            news_detail:{}
        }
    },
    components:{
        myHeader
    },
    methods:{
        increment_like(){
            const now = new Date()
            const year = now.getFullYear()
            const month = now.getMonth() + 1
            const day = now.getDate()
            const hours = now.getHours()
            const minutes = now.getMinutes()
            const seconds = now.getSeconds()
            const time = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds
            // ?newsId='+this.news_detail.newsId
            axios.get('http://localhost:8088/increment_like?newsId='+this.news_detail.newsId+'&userId='+this.account+'&time='+time+'&cateId='+this.news_detail.classification+'&author='+this.news_detail.author).then(
                this.news_detail.likes++,
                console.log(this.news_detail.likes)
            )
        }
    },
    computed:{
        ...mapState([
            'news','account', 'hot_news'
        ])
    },
    created(){
        const id = this.$route.params.id
        if(this.news.find(news => news.newsId == id)){
            this.news_detail = this.news.find(news => news.newsId == id)
        }else{
            this.news_detail = this.hot_news.find(hot_news => hot_news.newsId == id)
        }
    }
}
</script>

<style scoped>
.news{
    margin-top: 110px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: #5f6368;
    background-color: #f6f8fc;
}
.like_div{
    position:fixed;
    width: 50px;
    height: 70px;
    top: 330px;
    left: 180px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 4px 0 #dee4e6, -2px -2px 4px 0 #fff;
}
.like_div button{
    width: 100%;
    height: 70%;
    border: 0;
    background-color: white;
    cursor: pointer;
}
.like_div button img{
    width: 100%;
    height: 100%;
}
.news_detail{
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: white; */
}
.news_title{
    font-size: 32px;
    font-weight: 700;
    color: #000;
    line-height: 42px;
    margin-top: 30px;
    margin-bottom: 30px;
}
.news_from{
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
    line-height: 18px;
    margin-bottom: 12px;
}
.news_time{
    margin-right: 10px;
}
.news_author{
    margin-right: 10px;
}
.news_classification{
    margin-right: 10px;
}
.news_pic{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 12px;
}
.news_pic img{
    width: 100%;
}
.news_content{
    text-indent:32px;
    width: 100%;
    color: #333;
    line-height: 30px;
    letter-spacing: .5px;
    font-size: 16px;
}
</style>