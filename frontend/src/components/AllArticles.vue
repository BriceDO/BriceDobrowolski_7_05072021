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
                                            <img class="rounded-circle" width="45" src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?s=612x612" alt="user_icon">
                                        </div>
                                        <div>
                                            <div class="ms-2">{{article.prenom}} {{article.nom}}</div>
                                        </div>
                                    </div>
                                        <div>
                                            <b-dropdown aria-label="options article" v-if="article.id_utilisateur == userId" id="dropdown-dropleft" dropleft variant="primary" class="m-2 float-right">
                                                <b-dropdown-item aria-label="modifier article" v-on:click="setIdArticleToUpdate(article.id)">Modifier</b-dropdown-item>
                                                <b-dropdown-item aria-label="supprimer article" v-on:click="deleteArticle(article.id, index)">Supprimer</b-dropdown-item>
                                            </b-dropdown>
                                        </div>
                                </div>
                                <div class="card-body">
                                    <small> <i class="fa fa-clock-o"></i> Le {{ article.date_creation | filterFormatDate }}</small>

                                    <!-- Lecture -->
                                    <div v-if="idArticleUpdate != article.id">
                                        <a class="card-link"  >
                                            <h5 v-on:click="goToOneArticle(article.id)" class="card-title mt-2">{{ article.titre }}</h5>
                                        </a>
                                        <p class="card-text">{{ article.article_contenu }}</p>
                                    </div>

                                    <!-- Update -->
                                    <div class="form-group mt-2" v-else>
                                        <input type="text" class="form-control mb-2" id="message" maxlength="45" rows="1" v-model="article.titre">
                                        <textarea v-model="article.article_contenu" class="form-control mb-2" id="message" rows="3"></textarea>
                                        <input v-on:click="modifyArticle(article.id, article)" type="submit" value="Modifier" class="btn-success rounded">
                                        <input class="btn-danger ms-2 rounded" type="submit" value="Annuler" v-on:click="setIdArticleToUpdate(null)">
                                    </div>
                                    
                                    <div v-if="article.article_image">
                                        <img :src="imgName(article.article_image)" width="250px" class="img-fluid img-thumbnail rounded mx-auto d-block" alt="" >
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
            userIdStorage: localStorage.getItem('userId'),
            userId: localStorage.getItem('userId'),
            idArticleUpdate: null,
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
            let month = ('0'+(newDate.getMonth() + 1)).slice(-2);
            let day = ('0'+newDate.getDate()).slice(-2);
            return day + "/" + month + "/" + newDate.getFullYear() + " à " + hours + "h" + mins;
        }
    },
    methods: {
        goToOneArticle: function(articleId) {
            this.$router.push({name:'oneArticle', params:{id:articleId}});
        },
        loadArticles: function() {
            axios.get(process.env.VUE_APP_API_BACKEND_URL+'/api/articles', {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(reponse => {
            this.allArticles = reponse.data.allArticles
        })
        .catch((error) => {
            console.log(error.message);
        })
        },
        imgName(filename){
            return `${process.env.VUE_APP_API_BACKEND_URL}/images/${filename}`;
        },
        deleteArticle(id, index) {
            axios.delete(process.env.VUE_APP_API_BACKEND_URL+'/api/articles/'+id, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(() => {
                console.log('article supprimé');
                this.allArticles.splice(index, 1)
            })
            .catch((error) => {
                console.log(error.message);
            })
        },
         modifyArticle(id, article) {
             axios.put(process.env.VUE_APP_API_BACKEND_URL+'/api/articles/'+id, article, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
             .then(() => {
                 console.log('article modifié');
                 this.idArticleUpdate = null
             })
             .catch((error) => {
                 console.log(error.message);
             })
        },
        setIdArticleToUpdate(article_id){
            this.idArticleUpdate = article_id
        }
    }
}

</script>

<style scoped>
    .col {
        margin-bottom: 100px;
    }
    
</style>