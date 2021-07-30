<template>
    <div>
        <div class="card mb-5 mt-5">
        <div class="card-body">
            <div class="tab-content" id="myTabContent">
                    <div class="form-group">
                        <div>
                            <img class="rounded-circle mb-2 me-2" width="60" src="https://picsum.photos/50/50" alt="">
                            <span>Bonjour <b> {{userPrenom}} </b>! Quoi de neuf ?</span> 
                        </div>
                        <input v-model="article.titre" type="text" class="form-control mb-2" id="message" maxlength="45" rows="1" placeholder="Le titre de votre publication">
                        <textarea v-model="article.article_contenu" class="form-control" id="message" rows="3" placeholder="Le contenu de votre publication"></textarea>
                    </div>
            </div>
            <div class="btn-toolbar justify-content-between">
                    <form >
                        <div class="form-group">
                            <input type="file" @change="onSelect" class="form-control-file" id="exampleFormControlFile1">
                        </div>
                    </form>
                        <button v-on:click="onUpload" v-on:click.prevent="sendArticle" class="btn btn-primary me-2 mt-2">Partager</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'CreateArticle',
    data() {
        return {
            article:{
                titre: null,
                article_contenu: null,
                article_image: null,
                id_utilisateur: localStorage.getItem('userId')
            },
            userPrenom: localStorage.getItem('userPrenom'),
            userNom: localStorage.getItem('userNom'),
            userPhoto: localStorage.getItem('userPhoto'),
            userId: localStorage.getItem('userId')
        }
    },
    methods: {
        sendArticle() {
            axios.post('http://localhost:3000/api/articles',
            this.article,
            {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(() => {
                console.log('article créé');
                this.$emit('articleCree');
                this.clearData();
            })
            .catch((error) => {
                console.log(error.message);
            })
        },
        clearData() {
            this.article.titre = null;
            this.article.article_contenu = null;
            this.article.article_image = null;
        },
        onSelect(event) {
            this.article_image = event.target.files[0];
            console.log(this.article_image);
        },
        onUpload() {
            
        }
    }
}
</script>

<style scoped>

</style>