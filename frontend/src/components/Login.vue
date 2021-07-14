<template>
    <div class="vue-tempalte">
        <form>
            <h3>Connexion</h3>

            <div class="form-group">
                <label>Adresse email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block mt-3">Se connecter</button>

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