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

    const generateStudents = async(firstActiveStudent, secondActiveStudent) => {
        
        const {data} = await supabase.from("Students").select().eq('active', false).order('lastTo', {ascending: true}).select()
        console.log(data)
        console.log(data.filter(student => student.group == 1)[0].lastname)

        const {newData} = await supabase.from('Students').update({active: false}).eq('id', firstActiveStudent.id)
        const {newNewData} = await supabase.from('Students').update({active: false}).eq('id', secondActiveStudent.id)
        console.log(firstActiveStudent, secondActiveStudent)
        firstActiveStudent = data.filter(student => student.group == 1)[0]
        secondActiveStudent = data.filter(student => student.group == 2)[0]
        console.log(firstActiveStudent, secondActiveStudent)

        const {changeData} = await supabase.from('Students').update({active: true}).eq('id', firstActiveStudent.id)
        const {changeSecondData} = await supabase.from('Students').update({active: true}).eq('id', secondActiveStudent.id)

    }
</script>

<template>
    <div class="whole-students-template">

        <button class="generate-students" @click="generateStudents(firstActiveStudent, secondActiveStudent)"><h3>GENERATE NEW STUDENTS</h3></button>

        <div class="text">
            <h1>This week are duty:</h1>
        </div>
        
        <div class="first-student">
            <h2>{{(firstActiveStudent.firstname + " " + firstActiveStudent.lastname)}}</h2>


            <a href="#/students-table"  class="btn-fir"><h4>Change Student</h4></a>            
        </div>

        <div class="second-student">
            <h2>{{(secondActiveStudent.firstname + " " + secondActiveStudent.lastname)}}</h2>


            <a href="#/students-table"  class="btn-sec"><h4>Change Student</h4></a>
        </div>

    </div>
    <div class="other-things-template">
        <a href="#/students-table" class="see-all-btn"><h4>See All Students</h4></a>
    </div>
</template>


<style lang="scss">

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
        color: #F0F0F0;
        background-color: #404040;
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
        margin-top: 5%;
        margin-left: 5%;
    }
    .second-student{
        display: inline-block;
        margin-left: 10%;
        margin-top: 5%;
    }
    .btn-fir{
        width: auto;
        height: auto;
        display: inline-block;
        background-color: #585858;
        color: #F0F0F0;
        border-radius: 8px;
        text-align: center;
        text-decoration: inherit;
        &:hover {
            color: #404040;
        }
    }
    .btn-sec{
        width: auto;
        height: auto;
        display: inline-block;
        background-color: #585858;
        color: #F0F0F0;
        border-radius: 8px;
        text-align: center;
        text-decoration: inherit;
        &:hover {
            color: #404040;
        }
    }

    .generate-students{
        margin-left: -5%;
        margin-bottom: 20%;
        display: inline-block;
        border-radius: 16px;
        color: #F0F0F0;
        background-color: #585858;
        &:hover {
            color: #404040;
        }
    }

    .other-things-template{
        margin: auto;
        margin-top: 5%;
        max-width: 20vw;
        height: 8vw;
        background-color: #404040;
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
        color: #F0F0F0;
        border-radius: 8px;
        text-align: center;
        text-decoration: inherit;
        &:hover {
            color: #404040;
        }
    }

</style>
