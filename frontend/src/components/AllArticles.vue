<template>
<div>
    <h1>Tous les articles</h1>  
    <hr>
    <ul>
        <li v-bind:key="index" v-for="(article, index) in allArticles">
            <div class="card m-2">
                <p>{{article.article_contenu}}</p>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import axios from 'axios'

export default {
    
    name:'AllArticles',
    data() {
        return {
            allArticles: []
        }
    },
    created(){
        axios
        .get('http://localhost:3000/api/articles')
        .then(reponse => {
            this.allArticles = reponse.data.allArticles
        })
    }
}
</script>

