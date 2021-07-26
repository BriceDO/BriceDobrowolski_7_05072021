<template>
    <div>
        <div class="card mb-5 mt-5">
        <div class="card-body">
            <div class="tab-content" id="myTabContent">
                    <div class="form-group">
                        <div>
                            <img class="rounded-circle mb-2 me-2" width="60" src="https://picsum.photos/50/50" alt="">
                            <span>Bonjour <b> {{nom}} </b>! Quoi de neuf ?</span> 
                        </div>
                        <input v-model="article.titre" type="text" class="form-control mb-2" id="message" maxlength="45" rows="1" placeholder="Le titre de votre publication">
                        <textarea v-model="article.article_contenu" class="form-control" id="message" rows="3" placeholder="Le contenu de votre publication"></textarea>
                    </div>
            </div>
            <div class="btn-toolbar justify-content-between">
                    <form>
                        <div class="form-group">
                            <input type="file" class="form-control-file" id="exampleFormControlFile1">
                        </div>
                    </form>
                        <button v-on:click.prevent="sendArticle" type="submit" class="btn btn-primary me-2 mt-2">Partager</button>
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
                titre:'',
                article_contenu: '',
                article_image:''
            },
            nom : localStorage.getItem('userPrenom')
        }
    },
    methods: {
        sendArticle() {
            axios.post('http://localhost:3000/api/articles', this.article)
            .then(() => {
                // console.log(JSON.parse(localStorage.getItem('loggedUserData'))); 
            })
            .catch((error) =>{
                console.log(error.message);
            })
        }
    }
}
</script>

<style scoped>

</style>