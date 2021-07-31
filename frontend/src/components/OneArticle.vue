<template> 
    <div>
        <div class="container">
            <p class="text-right mt-3"><router-link :to="{name: 'allArticles'}">Retour au fil d'actualité</router-link></p>
            <div class="row">
                <div class="col">
                    <div class="card mb-3">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                                    </div>
                                    <div>
                                        <div class="ms-2 text-muted">{{oneArticle.prenom}} {{oneArticle.nom}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="text-muted mb-2"> <i class="fa fa-clock-o"></i> {{oneArticle.date_creation | filterFormatDate }}</div>
                                <a class="card-link" href="#">
                                    <h5 class="card-title"><router-link to="/" >{{oneArticle.titre}}</router-link></h5>
                                </a>
                                <p class="card-text">{{oneArticle.article_contenu}}</p>
                                <div>
                                    <img src="https://picsum.photos/50/50" class="img-fluid img-thumbnail rounded mx-auto d-block" alt="" >
                                </div>
                            </div>
                            <div class="card-footer border-bottom">
                                <i class="fa fa-comment "></i>
                                <span v-if="oneArticle.nbCommentaire < 2" class="card-link ms-2 ">{{ oneArticle.nbCommentaire }} commentaire</span>
                                <span v-else class="card-link ms-2 ">{{ oneArticle.nbCommentaire }} commentaires</span>
                            </div>
                        </div>
                    </div>   
                <div class="container mt-2 mb-2">   
                    <div class="d-flex justify-content-center row">
                        <div class="col-md-10">
                            <div class="d-flex flex-row align-items-center add-comment p-2 bg-white rounded">
                                <img class="rounded-circle" src="https://i.imgur.com/QvDFBCC.jpg" width="40">
                                <input type="text" class="form-control border-0 no-box-shadow ml-1" placeholder="Votre commentaire...">
                            </div>
                            <div class="p-3 bg-white mt-2 rounded">
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex flex-row"><img class="rounded-circle me-2" src="https://i.imgur.com/Yxje2El.jpg" width="25%">
                                        <div class="d-flex flex-column ml-2">
                                            <span class="ms-1">Prenom Nom</span>
                                            <small class="ms-1 text-muted"> <i class="fa fa-clock-o"></i> </small>
                                        </div>
                                    </div>
                                        <b-dropdown id="dropdown-dropleft" dropleft variant="primary" class="m-2 float-right">
                                            <b-dropdown-item href="#">Modifier</b-dropdown-item>
                                            <b-dropdown-item href="#">Supprimer</b-dropdown-item>
                                        </b-dropdown>
                                </div>
                                    <div class="text-justify mt-2">
                                        <p>Contenu.</p>
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
            oneArticle: {},
            allComments:[],
            articleId: this.$route.params.id
        }
    },
    created(){
        this.loadArticle();
    },
    methods: {
        loadArticle() {
            axios.get('http://localhost:3000/api/articles/'+this.articleId, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(reponse => {
            console.log(reponse);
            this.oneArticle = reponse.data.article
        })
        .catch((error) => {
            console.log(error.message);
        })
    }},
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
}
</script>

<style scoped>

</style>