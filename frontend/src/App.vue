<template>
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <header-top></header-top>
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>


<script>

import Header from './components/Header.vue'

export default {
  name:'App',
  components: {
    'header-top': Header,
  }
}
</script>