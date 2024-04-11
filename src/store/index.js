import { createStore } from 'vuex'
import axios from 'axios';
// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      flag: '0',
      news: [],
      hot_news: [],
      page: 1,
      account: '',
      password: ''
    }
  },
  mutations: {
    flag_change(state, category){
        state.flag = category
    },
    getNews(state){
        console.log('flag', state.flag);
        axios.get('http://localhost:8088/news?page='+state.page+'&pageSize=10&classification='+Number(state.flag)).then(
            res => {
                for(let i = 0; i < res.data.length; i++){
                    const article = {};
                    article.newsId = res.data[i].newsId;
                    article.title = res.data[i].title;
                    article.classification = res.data[i].classification
                    article.author = res.data[i].author
                    article.time = res.data[i].time
                    article.likes = res.data[i].likes
                    article.content = res.data[i].content
                    article.img_url = res.data[i].img_url
                    state.news.push(article)
                }
            },
            state.page++,
            console.log(state.news)
        )
    },
    get_hotnews(state){
      state.hot_news = []
      axios.get('http://localhost:8088/hotnews').then(
        res => {
          for(let i=0; i<res.data.length; i++){
            const article = {};
            article.newsId = res.data[i].newsId;
            article.title = res.data[i].title;
            article.classification = res.data[i].classification
            article.author = res.data[i].author
            article.time = res.data[i].time
            article.likes = res.data[i].likes
            article.content = res.data[i].content
            article.img_url = res.data[i].img_url
            state.hot_news.push(article)
          }
        }
      )
    },
    clean_news(state){
        state.news = [];
    },
    clean_page(state){
        state.page = 1
    },
    get_account_password(state, r){
      const [a, p] = r
      state.account = a
      state.password = p
    },
    clean_account_password(state){
      state.account = ''
      state.password = ''
    }
  },
  getters:{
    
  }
})

export default store