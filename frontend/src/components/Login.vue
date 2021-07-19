<template>
    <div>
        <form>
            <h3>Connexion</h3>

            <div class="form-group">
                <label>Adresse email</label>
                <input type="email" class="form-control form-control-lg" aria-describedby="aideEmail"
                 title="Entrez votre addresse email" />
            </div>

            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" name="mot de passe"
                title="Entrez votre mot de passe" />
                
            </div>

            <button  type="submit" class="btn btn-dark btn-lg btn-block mt-3">Se connecter</button>
            <p class="text-right mt-3">
                Vous n'avez pas de compte ?
                <router-link :to="{name: 'signup'}">Créez-en un</router-link>
            </p>
        </form>
    </div>
</template>

<script>
    export default {
        name :'Login',
        data() {
            return {}
        }
    }
</script>