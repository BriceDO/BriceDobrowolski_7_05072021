<template>
  <div>
    <nav class="navbar shadow bg-white rounded">
      <div class="container">
        <img class="logo_header img-fluid" href="#" alt="logo_header" src="http://localhost:3000/images/icon-left-font.png" width="250px" target="_blank">
        <ul v-if="!userPrenom" class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
             <router-link class="nav-link pr-3" to="/">Se connecter</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary ms-2" to="/signup">S'inscrire</router-link>
          </li>
        </ul>
        <ul v-else class="nav navbar-nav flex-row float-right">
           <li class="nav-item">
            <button v-on:click="logOut" class="btn btn-outline-primary ms-2">Se déconnecter</button>
          </li>
        </ul>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name:'Header',
    data() {
      return {
         userPrenom: localStorage.getItem("userPrenom"),
      }
    },
    methods: { 
      logOut() {
          this.userPrenom = null;
          localStorage.clear();
          this.$router.push('/')
        }
    }
}
</script>