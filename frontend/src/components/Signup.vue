<template>
    <div>
        <form>
            <h3>Inscription</h3>

            <div class="form-group">
                <label>Nom</label>
                <input type="text" class="form-control"/>
            </div>

            <div class="form-group">
                <label>Prénom</label>
                <input type="text" class="form-control"/>
            </div>

            <div class="form-group">
                <label>Adresse email</label>
                <input type="email" class="form-control" />
            </div>

            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control"/>
                <small id="emailHelp" class="form-text text-muted">* Au moins 6 caractères dont un chiffre.</small>
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block mt-3">S'inscrire</button>

            <p class="text-right mt-3">
                Déjà inscrit ?
                <router-link :to="{name: 'login'}">Se connecter</router-link>
            </p>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Signup',
        data() {
            return {}
        },
        created(){
            axios
            .get('http://localhost:3000/api/articles')
            .then(reponse => {
                console.log(reponse);
            })
        }
    }
</script>