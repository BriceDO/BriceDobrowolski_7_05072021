<template>
    <div>
        <div class="container">
            <CreateArticle v-on:articleCree="loadArticles()"></CreateArticle>
                <div class="row">
                    <div class="col">
                        <div v-bind:key="index" v-for="(article, index) in allArticles" class="card mb-2">
                            <div class="card-header">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                                        </div>
                                        <div>
                                            <div class="ms-2 text-muted">{{article.prenom}} {{article.nom}}</div>
                                        </div>
                                    </div>
                                        <div class="">
                                            <b-dropdown id="dropdown-dropleft" dropleft variant="primary" class="m-2 float-right">
                                                <b-dropdown-item href="#">Modifier</b-dropdown-item>
                                                <b-dropdown-item href="#">Supprimer</b-dropdown-item>
                                            </b-dropdown>
                                        </div>
                                </div>
                                <div class="card-body">
                                    <div class="text-muted mb-2"> <i class="fa fa-clock-o"></i> Le {{ article.date_creation | filterFormatDate }}</div>
                                    <a class="card-link"  >
                                        <h5 v-on:click="goToOneArticle(article.id)" class="card-title">{{ article.titre }}</h5>
                                    </a>
                                    <p class="card-text">{{ article.article_contenu }}</p>

                                    <div v-if="article.article_image.length > 2">
                                        <img :src="imgName(article.article_image)" width="20%" class="img-fluid img-thumbnail rounded mx-auto d-block" alt="" >
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <i class="fa fa-comment"></i>
                                    <span v-if="article.nbCommentaire < 2" class="ms-2">{{ article.nbCommentaire }} commentaire </span>
                                    <span v-else class="ms-2">{{ article.nbCommentaire }} commentaires </span>
                                </div>
                            </div>
                        </div>     
                    </div>
                </div>
        </div>

    </div>
</template>

<script>

import CreateArticle from './CreateArticle.vue'
import axios from 'axios'

export default {
    components: { 
        CreateArticle,
        }, 
    name:'AllArticles',
    data() {
        return {
            allArticles: [],
            showImg: false
        }
    },
    created(){
        this.loadArticles();
    },
    filters: {
        filterFormatDate: function (date) {
            let newDate = new Date(date);
            let hours = ('0'+newDate.getHours()).slice(-2);
            let mins = ('0'+newDate.getMinutes()).slice(-2);
            let month = ('0'+newDate.getMonth()).slice(-2);
            let day = ('0'+newDate.getDate()).slice(-2);
            return day + "/" + month + "/" + newDate.getFullYear() + " à " + hours + "h" + mins;
        }
    },
    methods: {
        goToOneArticle: function(articleId) {
            this.$router.push({name:'oneArticle', params:{id:articleId}});
        },
        loadArticles: function() {
            axios.get('http://localhost:3000/api/articles', {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(reponse => {
            console.log(reponse.data.allArticles);
            this.allArticles = reponse.data.allArticles
        })
        .catch((error) => {
            console.log(error.message);
        })
        },
        imgName(filename){
            return `http://localhost:3000/images/${filename}`;
        }
    }
}

</script>

<style scoped>


</style>