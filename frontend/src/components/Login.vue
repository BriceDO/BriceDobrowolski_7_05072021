<template>
    <div>
        <div class="container">
        <form>
            <h3 class="mt-5">Connexion</h3>

            <div class="form-group col-md">
                <label>Adresse email</label>
                <input v-model="user.email" type="email" class="form-control form-control-lg" aria-describedby="aideEmail"
                 title="Entrez votre addresse email" required/>
            </div>

            <div class="form-group col-md">
                <label>Mot de passe</label>
                <input v-model="user.password" type="password" class="form-control form-control-lg" name="mot de passe"
                title="Entrez votre mot de passe" required/>
                <small v-if="errorLogin" class="form-text text-danger">L'email ou le mot de passe est incorrect.</small>
                <small v-if="successLogin" class="form-text text-success">Utilisateur connecté.</small>
            </div>

            <button v-on:click.prevent="sendForm" type="submit" class="btn btn-dark btn-lg btn-block mt-3">Se connecter</button>
            <p class="text-right mt-3">
                Vous n'avez pas de compte ?
                <router-link :to="{name: 'signup'}">Créez-en un</router-link>
            </p>

        </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'


    export default {
        name :'Login',
        data() {
            return {
                user:{
                    email:'',
                    password:'',
                },
                errorLogin: false,
                successLogin: false
            }
        },
        methods: {
            sendForm(){
                axios.post('http://localhost:3000/api/auth/login', this.user)
                .then((res) => {
                    localStorage.setItem('token', res.data.token)
                    this.successLogin = true
                    this.errorLogin = false
                    
                    this.$router.push('articles');
                })
                .catch((error) =>{
                    console.log(error.message);
                    this.errorLogin = true
                    this.successLogin = false
                })
            }
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