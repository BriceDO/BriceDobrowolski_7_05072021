<template>
  <div>
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" href="#" target="_blank">
           Groupomania
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
             <router-link class="nav-link pr-3" to="/">Se connecter</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary ms-2" to="/signup">S'inscrire</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name:'Header'
}
</script>