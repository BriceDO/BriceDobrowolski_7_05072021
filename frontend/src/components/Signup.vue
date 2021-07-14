<template>
    <div class="vue-tempalte">
        <form>
            <h3>Inscription</h3>

            <div class="form-group">
                <label>Nom</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>

            <div class="form-group">
                <label>Prénom</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>

            <div class="form-group">
                <label>Adresse email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block mt-3">S'inscrire</button>

            <p class="forgot-password text-right mt-3">
                Déjà inscrit ?
                <router-link :to="{name: 'login'}">Se connecter</router-link>
            </p>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>