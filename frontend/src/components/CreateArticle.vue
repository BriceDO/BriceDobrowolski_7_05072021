<template>
    <div>
        <div class="card mb-4 mt-5">
        <div class="card-body">
            <div class="tab-content" id="myTabContent">
                    <div class="form-group">
                        <div>
                            <img class="iconUser rounded-circle mb-2 me-2" width="60" src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?s=612x612" alt="">
                            <span>Bonjour <b> {{userPrenom}} </b>! Quoi de neuf ?</span> 
                        </div>
                        <input v-model="article.titre" type="text" class="form-control mb-2" id="titre" minlength="3" maxlength="45" rows="1" placeholder="Le titre (obligatoire)" required>
                        <textarea v-model="article.article_contenu" class="form-control" id="contenu" minlength="3" rows="3" placeholder="Le contenu (obligatoire)" required></textarea>
                    </div>
            </div>
            <div class="btn-toolbar justify-content-between">
                    <form >
                        <label>
                        <div class="form-group">
                            <input  aria-label="envoi image" type="file" @change="onSelect" class="form-control-file" id="image">
                        </div>
                        </label>
                    </form>
                    <small v-if="errorArticle" class="form-text text-danger">Un article doit contenir un titre et un contenu</small>
                    <label>
                    <button v-on:click.prevent="sendArticle" class="btn btn-primary me-2 mt-2">Partager</button>
                    </label>
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
                titre: '',
                article_contenu: '',
                article_image: null,
                id_utilisateur: localStorage.getItem('userId')
            },
            userPrenom: localStorage.getItem('userPrenom'),
            userNom: localStorage.getItem('userNom'),
            userPhoto: localStorage.getItem('userPhoto'),
            userId: localStorage.getItem('userId'),
            errorArticle: false
        }
    },
    methods: {
        sendArticle() {

            if (this.article.titre == '' || this.article.article_contenu == '') {
                this.errorArticle = true
                return
            } else {
                const formData = new FormData()
                formData.append('article_image', this.article.article_image);
                formData.append('article_contenu', this.article.article_contenu);
                formData.append('id_utilisateur', this.article.id_utilisateur);
                formData.append('titre', this.article.titre);
                
                axios.post(process.env.VUE_APP_API_BACKEND_URL+'/api/articles', formData,
                {headers : {
                    "Authorization": 'Bearer ' + localStorage.getItem('token')
                    }})
                .then(() => {
                    console.log('article créé');
                    this.$emit('articleCree');
                    this.clearData();
                    this.errorArticle = false
                })
                .catch((error) => {
                    console.log(error.message);
                    
                })
            }
        },
        clearData() {
            this.article.titre = '';
            this.article.article_contenu = '';
            this.article.article_image = null;
        },
        onSelect(event) {
            this.article.article_image = event.target.files[0];
        }
    }
}
</script>

<style scoped>

</style>