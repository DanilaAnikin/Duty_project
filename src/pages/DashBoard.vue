<script setup>
    import { supabase } from '@/supabase';
    import {ref, onMounted} from 'vue'

    const students = ref([])
    let firstActiveStudent = ref([])
    let secondActiveStudent = ref([])


    onMounted(() => {
        getStudents()
    })

    const getStudents = async() => {
        const { data } = await supabase.from('Students').select();

        students.value = data;

        firstActiveStudent.value = students.value.filter(student => student.active)[0]
        secondActiveStudent.value = students.value.filter(student => student.active)[1]

    }

</script>

<template>
    <div class="whole-students-template">

        <div class="text">
            <h1>This week are duty:</h1>
        </div>
        
        <div class="first-student">
            <h2>{{(firstActiveStudent.firstname + " " + firstActiveStudent.lastname)}}</h2>


            <a href="#/changeStudentFirstGroup"  class="btn-fir"><h4>Change student</h4></a>            
        </div>

        <div class="second-student">
            <h2>{{(secondActiveStudent.firstname + " " + secondActiveStudent.lastname)}}</h2>


            <a href="#/changeStudentSecondGroup"  class="btn-sec"><h4>Change student</h4></a>
        </div>

    </div>
    <div class="other-things-template">
        <a href="#/studentsTable" class="see-all-btn"><h4>See All Students</h4></a>
    </div>
</template>


<style>

    body, html{
        padding: 0;
        margin: 0;
        width: 100%;
        min-height: 100%;
    }
    body{
        background-color: #707070;
    }

    .whole-students-template{
        margin: auto;
        margin-top: 10%;
        width: 60%;
        max-width: 100vw;
        height: 20vw;
        color: white;
        background-color: #101A35;
        border-radius: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .text{
        margin-right: 5%;
        display: inline-block;
    }
    .first-student{
        display: inline-block;
        margin-left: 5%;
        margin-top: 3%;
    }
    .second-student{
        display: inline-block;
        margin-left: 5%;
        margin-top: 3%;
    }
    .btn-fir{
        width: auto;
        height: auto;
        display: inline-block;
        background-color: #585858;
        color: white;
        border-radius: 8px;
        text-align: center;
        text-decoration: inherit;
    }
    .btn-sec{
        width: auto;
        height: auto;
        display: inline-block;
        background-color: #585858;
        color: white;
        border-radius: 8px;
        text-align: center;
        text-decoration: inherit;
    }


    .other-things-template{
        margin: auto;
        margin-top: 5%;
        max-width: 20vw;
        height: 8vw;
        background-color: #101A35;
        border-radius: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .see-all-btn{
        width: auto;
        height: auto;
        display: inline-block;
        background-color: #585858;
        color: white;
        border-radius: 8px;
        text-align: center;
        text-decoration: inherit;
    }

</style>
