<script>
  // import students from "../data" 
  import {createApp, ref, computed} from 'vue'
  import students from './pages/DashBoard.vue'
  import DashBoard from './pages/DashBoard.vue'
  import StudentsPicker from './components/StudentsPicker.vue'
  import AddStudent from './pages/AddStudent' 
  import PickStudents from './pages/AddStudent' 
  import StudentsTable from './pages/AddStudent' 

  const routes = {
    "/": DashBoard,
    "/studentPick": StudentsPicker

  }


  const currentPath = ref(window.location.hash)

  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
  })

  const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/'] || NotFound
  })

  createApp({}).mount('#app')

export default { 
  name: 'App', 
  components:{
    'Dashboard': students,
    'AddStudent': AddStudent,
    'PickStudents': PickStudents,
    'StudentsTable': StudentsTable
  }
}
</script>


<template>
  <Dashboard />
</template>

<style scoped>

</style>
