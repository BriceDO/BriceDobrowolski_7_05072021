<template>
    <div>
        <div class="container">
            <form class="form-inline justify-content-center">
                <h3 class="mt-5">Inscription</h3>

                <div class="form-group">
                    <label>Nom</label>
                    <input v-model="user.nom" type="text" name="Votre nom" class="form-control" required/>
                </div>

                <div class="form-group">
                    <label>Prénom</label>
                    <input v-model="user.prenom" type="text" name="Votre prénom" class="form-control" required/>
                </div>

                <div class="form-group">
                    <label>Adresse email</label>
                    <input v-model="user.email" pattern="" type="email" name="Votre adresse email" class="form-control" required/>
                </div>

                <div class="form-group ">
                    <label>Mot de passe</label>
                    <input v-model="user.password" pattern="^(?=\D*\d)\S{6,}$" type="password" name="Votre mot de passe" class="form-control" required/>
                    <small class="form-text text-muted">Au moins 6 caractères dont un chiffre.</small>
                </div>

                <button v-on:click.prevent="sendForm" type="submit" class="submit btn btn-dark btn-lg btn-block mt-3">
                    
                <router-link class="router-link" :to="{name: 'allArticles'}"> S'inscrire </router-link>

                </button>

                <p class="text-right mt-3">
                    Déjà inscrit ?
                    <router-link  :to="{name: 'login'}">Se connecter</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Signup',
        data() {
            return {
                user:{
                    nom:'',
                    prenom: '',
                    email:'',
                    password:'' 
                },
            }   
        },
        methods: {
            sendForm(){
                axios.post('http://localhost:3000/api/user/signup', this.user)
                .then(() => {
                    console.log("Le compte a été créé !")
                    localStorage.setItem('user', this.user)
                    console.log(this.user);
                })
                .catch((error) =>{
                    console.log(error.message);
                })
            },
        }
    }
</script>

<style scoped>

input.form-control:valid {
    border:3px solid #0a0 !important;
}

input.form-control:invalid {
    border:1px solid grey !important;
} 

</style>