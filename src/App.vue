<script>
  // import students from "../data" 
  import {createApp} from 'vue'
  import students from './pages/DashBoard.vue'
  // import AddStudent from './pages/AddStudent' 
  // import PickStudents from './pages/AddStudent' 
  // import StudentsTable from './pages/AddStudent' 



  createApp({}).mount('#app')

export default { 
  name: 'App', 
  components:{
    'Dashboard': students
    // 'DashBoard': DashBoard,
    // 'AddStudent': AddStudent,
    // 'PickStudents': PickStudents,
    // 'StudentsTable': StudentsTable
  }
}
</script>


<template>
  <Dashboard />
</template>

<style scoped>

</style>
