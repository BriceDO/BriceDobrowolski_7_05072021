<template> 
    <div>
        <div class="container">
            <button class="home btn btn-light text-right mb-3 mt-3 me-3">
                <b-icon class="me-2" icon="arrow-left-square"></b-icon>
                <router-link class="home" :to="{name: 'allArticles'}">Retour au fil d'actualité</router-link>
                </button>
            <div class="row">
                <div class="col">
                    <div class="card mb-3">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <img class="rounded-circle" width="45" src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?s=612x612" alt="user_icon">
                                    </div>
                                    <div>
                                        <div class="ms-2">{{oneArticle.prenom}} {{oneArticle.nom}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <small class="mb-2"> <i class="fa fa-clock-o"></i> {{oneArticle.date_creation | filterFormatDate }}</small>
                                    <h5 class="card-title mt-2 mb-3 border-bottom">{{oneArticle.titre}}</h5>
                                <p class="card-text">{{oneArticle.article_contenu}}</p>
                                <div v-if="oneArticle.article_image">
                                    <img :src="imgName(oneArticle.article_image)" class="img-fluid img-thumbnail rounded mx-auto d-block" alt="" >
                                </div>
                            </div>
                            <div class="card-footer border-bottom">
                                <i class="fa fa-comment"></i>
                                <span v-if="oneArticle.nbCommentaire < 2" class="ms-2">{{ oneArticle.nbCommentaire }} commentaire</span>
                                <span v-else class="ms-2">{{ oneArticle.nbCommentaire }} commentaires</span>
                            </div>
                        </div>
                    </div>   
                    <!-- Input Comment -->
                <div class="container mt-2 mb-2">   
                    <div class="d-flex justify-content-center row">
                        <div class="col-md-10">
                            <div class="d-flex flex-row align-items-center add-comment p-2 bg-white rounded">
                                <img class="rounded-circle" src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?s=612x612" width="40" alt="user_icon">
                                <input @keyup.enter="sendComment()" v-model="commentInput.commentaire_contenu" type="text" class="form-control ms-1" placeholder="Votre commentaire..." required>
                               <button v-on:click="sendComment()" class="btn btn-success ms-2"> <b-icon  type="button"  icon="arrow-return-right"></b-icon> </button> 
                            </div>
                            <small v-if="errorComment" class="form-text text-danger mb-3">Votre commentaire est vide</small>

                            <!-- Comments -->
                            <div v-bind:key="index" v-for="(commentaire, index) in allComments" class="p-3 bg-white mt-2 rounded">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="d-flex flex-row"><img class="rounded-circle me-2" alt="post_picture" src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?s=612x612" width="45">
                                        <div class="d-flex flex-column ml-2 ">
                                            <span class="ms-1">{{ commentaire.prenom }} {{ commentaire.nom }}</span>
                                            <small class="ms-1"> <i class="fa fa-clock-o"></i> {{commentaire.date_creation | filterFormatDate}} </small>
                                        </div>
                                    </div>
                                    <b-dropdown v-if="commentaire.id_utilisateur == userId" id="dropdown-dropleft" dropleft variant="primary" class="m-2 float-right">
                                        <b-dropdown-item v-on:click="deleteComment(commentaire.id, index)">Supprimer</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                                <div class="text-justify mt-2 ">
                                    <span>{{commentaire.commentaire_contenu}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'OneArticle',
    data() {
        return {
            commentInput:{
                commentaire_contenu: null,
                id_utilisateur: localStorage.getItem('userId'),
                id_article: this.articleId
            },
            oneArticle: {},
            allComments: [],
            articleId: this.$route.params.id,
            userPrenom: localStorage.getItem('userPrenom'),
            userNom: localStorage.getItem('userNom'),
            userPhoto: localStorage.getItem('userPhoto'),
            userId: localStorage.getItem('userId'),
            errorComment: false
        }   
    },
    created(){
        this.loadArticle();
        this.loadComments();
    },
    methods: {
        loadArticle() {
            axios.get(process.env.VUE_APP_API_BACKEND_URL+'/api/articles/'+this.articleId, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(reponse => {
                this.oneArticle = reponse.data.article
            })
            .catch((error) => {
                console.log(error.message);
            })
        },
        loadComments() {
            axios.get(process.env.VUE_APP_API_BACKEND_URL+'/api/articles/'+this.articleId+'/comments', {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
             .then(reponse => {
                this.allComments = reponse.data.commentaires
            })
            .catch((error) => {
                console.log(error.message);
            })
        },
        deleteComment(id, index) {
             axios.delete(process.env.VUE_APP_API_BACKEND_URL+'/api/comments/'+id, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
             .then(() => {
                 console.log('commentaire supprimé');
                 this.allComments.splice(index, 1)
                 this.loadArticle();
             })
             .catch((error) => {
                 console.log(error.message);
             })
         },
        sendComment: function() {
            axios.post(process.env.VUE_APP_API_BACKEND_URL+'/api/articles/'+this.articleId+'/comments', this.commentInput, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(() => {
                console.log('commentaire créé');
                this.loadComments();
                this.loadArticle();
                this.commentInput.commentaire_contenu = null;
                this.errorComment = false
            })
            .catch((error) => {
                console.log(error.message);
                this.errorComment = true
            })
        },
        imgName(filename){
            return `${process.env.VUE_APP_API_BACKEND_URL}/images/${filename}`;
        }
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
    }
}
</script>

<style scoped>
    .col {
        margin-bottom: 100px;
    }

    a{
        text-decoration: none;
        color: black;
    }

    h5 {
        cursor: initial;
    }

    .card-title:hover {
        text-decoration: none;
        cursor: inherit;
    }
</style>