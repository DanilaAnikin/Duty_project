<script>
import {createApp} from 'vue'
import Router from './Router.vue';

createApp({}).mount('#app')


export default { 
  name: 'App', 
  components:{
    Router,
  }
}
</script>


<template>
  <Router/>
</template>