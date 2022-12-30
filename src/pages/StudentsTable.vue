<script setup>
  import {supabase} from '@/supabase';
  import {ref, onMounted} from 'vue';
  import Symbol from "../components/Symbol.vue"

  const students = ref([]);

  const props = defineProps(['admin'])

  const loadStudents = async () => {
      students.value = (await supabase.from('Students').select().order('id', {adcending: true})).data;
  }

  const getStudentName = student => `${student.firstname} ${student.lastname}`;

  const changeActive = async(student) => {
    if(props.admin){
      const {data} = await supabase.from('Students').update({active: !student.active}).eq('id', student.id).select()
      student.active = data[0].active
    } else{}
  }

  const deleteStudent = async(student) => {
    if(props.admin){
      const {data} = await supabase.from('Students').delete().eq('id', student.id).select()
      student = data[0]
    } else{}
  }

  onMounted(loadStudents);

</script>

<template>
    <div class="students-page">
        <h2 class="text-students" style="color: #D0D0D0;">Students</h2>
      <div class="students-table-header">
        <div class="w-name">Name</div>
        <div class="center w-status">Status</div> 
        <div class="center w-group">Group</div>
        <div v-if="props.admin" class="center w-delete">Delete</div>
      </div>
        <div class="students-table">
            <div v-for="student in students" :key="student.id" class="student">
                <div class="student-name" :class="{'nonadminname': !admin}">{{getStudentName(student)}}</div>
                <div class="student-status-one"><div class="student-status" :class="{'active': student.active, 'not-active': !student.active}" @click="changeActive(student)"/></div>
                <div class="center student-group">{{student.group}}</div>
                <button v-if="props.admin" class="btn-symbol"><Symbol class="symbol" @click="deleteStudent(student)"/></button>
            </div>
        </div>
        <a href="#/add-student" class="add-student"><h2>Add Student</h2></a>
    </div>
</template>

<style scoped lang="scss">


.students-page {
  border-radius: 16px;
  margin: auto;
  margin-top: 10%;
  background-color: #505050;
  width: 40%;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;

  h2 {
    width: 400px;
    display: inline-block;
  }
 }
 .text-students{
  margin-left: -25%;
 }

.students-table-header {
  justify-content: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #F0F0F0;
}

.center {
  display: flex;
  justify-content: center;
}

.w-name {
  width: 35%;
}
.student-name{
  margin-left: -14%;
  padding-right: 7%;
  width: 25%;

    &.nonadminname{
      margin-left: 2%;
    }
}
.student-status{
  margin-left: 8%;
  width: 20%;
}
.student-group{
  margin-left: 9%;
  padding-right: 7%;
  width: 20%;
}
.btn-symbol{
  border: none;
  background-color: #505050;
  padding: 0;
}


.w-status {
  margin-left: -20%;
  width: 20%;
}

.w-group {
  margin-left: -3%;
  width: 20%;
}
.w-delete{
  margin-left: -3%;
  width: 20%;
}

.students-table {
  width: 100%;
  margin-top: 5%;

  .student {
    background-color: #505050;
    color: #dddddd;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    padding: 6%;
    margin-bottom: 10%;
    justify-content: center;

    .student-status {
      height: 12px;
      width: 12px;
      border-radius: 50%;
      margin: auto;

      &.active {
        background-color: green;
      }

      &.not-active {
        background-color: #ab0000;
      }
    }
  }
}

.add-student{
  width: auto;
  height: auto;
  display: inline-block;
  color: #F0F0F0;
  background-color: #707070;
  border-radius: 8px;
  text-align: center;
  margin-top: 2vw;
  margin-bottom: 2vw;
  &:hover {
    color: #505050;
  }
}


@media only screen and (max-width: 600px){
  .students-page{
    margin-top: 30%;
    width: 90%;
  }
  .text-students{
    margin-left: 30%;
  }
  .students-table{
    width: 100%;
  }
  .student-status-one{
    margin-left: 100%;
    padding-right: 100%;
  }
  .w-group{
    margin-left: 3%;
  }
  .w-delete{
    margin-left: -1%;
  }
  .student-name{
    padding-right: 60%;
  }
  .student-group{
    padding-right: 100%;
  }
}


</style>
