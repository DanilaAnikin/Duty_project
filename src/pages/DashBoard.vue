<script setup>
    import { supabase } from '@/supabase';
    import {ref, onMounted} from 'vue'

    const students = ref([])
    let firstActiveStudent = ref([])
    let secondActiveStudent = ref([])


    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

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

        const {newData} = await supabase.from('Students').update({active: false}).eq('id', firstActiveStudent.id)
        const {newNewData} = await supabase.from('Students').update({active: false}).eq('id', secondActiveStudent.id)

        const {dateData} = await supabase.from('Students').update({lastTo: today}).eq('id', firstActiveStudent.id)
        const {secondDateData} = await supabase.from('Students').update({lastTo: today}).eq('id', secondActiveStudent.id)

        firstActiveStudent = data.filter(student => student.group == 1)[0]
        secondActiveStudent = data.filter(student => student.group == 2)[0]

        const {changeData} = await supabase.from('Students').update({active: true}).eq('id', firstActiveStudent.id)
        const {changeSecondData} = await supabase.from('Students').update({active: true}).eq('id', secondActiveStudent.id)

        const {DateData} = await supabase.from('Students').update({lastFrom: today}).eq('id', firstActiveStudent.id)
        const {SecondDateData} = await supabase.from('Students').update({lastFrom: today}).eq('id', secondActiveStudent.id)

        const {CountData} = await supabase.from('Students').select().eq('id', firstActiveStudent.id).select()
        const {theCountData} = await supabase.from('Students').select().eq('id', secondActiveStudent.id).select()
        const countOne = CountData[0].count
        const countTwo = theCountData[0].count
        console.log(countOne, countTwo)

        const {countData} = await supabase.from('Students').update({count: countOne+1}).eq('id', firstActiveStudent.id)
        const {secondCountData} = await supabase.from('Students').update({count: countTwo+1}).eq('id', secondActiveStudent.id)
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
        font-family: Arial;
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
        width: 100%;
        height: 50%;
        display: inline-block;
        background-color: #585858;
        color: #F0F0F0;
        border-radius: 16px;
        text-align: center;
        text-decoration: inherit;
        &:hover {
            color: #404040;
        }
    }
    .btn-sec{
        width: 80%;
        height: 50%;
        display: inline-block;
        background-color: #585858;
        color: #F0F0F0;
        border-radius: 16px;
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
        border-radius: 16px;
        text-align: center;
        text-decoration: inherit;
        &:hover {
            color: #404040;
        }
    }
    h4{
        padding-left: 20%;
        padding-right: 20%;
    }

    @media only screen and (max-width: 600px) {
        .whole-students-template{
            height: 100%;
            width: 90%;
            display:block ;
            margin-top: 20%;
        }
        #app{
            height: 100%!important;
        }
        .other-things-template{
            height: 10%;
            width: 100%;
            padding-left: 30%;
            padding-right: 30%;
        }
        .see-all-btn{
            width: 100%;
            height: 80%;
            margin-top: 15%;
            margin-bottom: 15%;
            padding-left: 50%;
            padding-right: 50%;
        }
        .btn-fir{
            height: 10%;
            width: 70%;
            margin-left: 5%; 
        }
        .btn-sec{
            height: 10%;
            width: 70%;
            margin-left: 5%; 
        }
        .text{
            margin-top: -10%;
        }
        .first-student{
            margin-left: 10%;
            margin-top: -5%;
        }
        .second-student{
            padding-bottom: 20%;
        }
        .generate-students{
            width: 50%;
            margin-top: 10%;
            margin-left: 10%;
        }
        .content{
            height: 100%;
        }
        body{
            height: 100%;
        }
    }


</style>
