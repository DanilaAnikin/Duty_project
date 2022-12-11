<script setup>
    import { supabase } from '../supabase.js';
    import {ref, onMounted} from 'vue'

    const students = ref([])
    onMounted(() => {
        getStudents()
    })

    const getStudents = async() => {
        const { data } = await supabase.from('Students').select();
        students.value = data;
    }

    const x = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eigth", "ninth", "tenth"]
    const allStudents = []


    students.value.forEach((student) => {
        student.firstname = students.value.firstname
        allStudents.push(student.firstname)
    });

    for(let i=0; i<students.value.length; i++){ 
        let student = [x[i] + "student", students.value.firstname]
        allStudents.push(student)
    }

</script>

<template>
    <div class="whole-whole-template">

        
        <div class="this-whole-template">

            <div class="button-this">
                <button>Change students</button>
            </div>

            <div class="this-text">
                <h1>This week are duty:</h1>
            </div>

            <div v-for="student in students" :key="student.id" class="students-this">
                <div v-if="(student.active === true)" class="this-if-students">
                    <h2>{{student.firstname}} {{student.lastname}}</h2>
                </div>
                <div v-else>
                    <p>nope</p>
                </div>
            </div>
        
        </div>


        <div class="next-whole-template">

            <div class="button-next">
                <button>Change students</button>
            </div>

            <div class="next-text">
                <h1>Next week are duty:</h1>
            </div>

            <div v-for="student in students" :key="student.id" class="students-next">
                <div v-if="(student.active === false)" class="next-if-students">
                    <h2>{{student.firstname}} {{student.lastname}}</h2>
                </div>
                <div v-else>
                    <p>nope</p>
                </div>
            </div>

        </div>


    </div>
</template>



<style scoped>
    .this-whole-template{
        width: 100%;
        max-width: 100vw;
        height: 20vw;
        border: 10px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .next-whole-template{
        margin-top: 10%;
        width: 100%;
        max-width: 100vw;
        height: 20vw;
        border: 10px solid blue;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .this-text{
        display: inline-block;
    }
    .next-text{
        display: inline-block;
    }
    .students-this{
        display: inline-block;
        margin-left: 5%;
    }
    .students-next{
        display: inline-block;
        margin-left: 5%;
    }
    .button-next{
        margin-right: 5%;
    }
    .button-this{
        margin-right: 5%;
    }
</style>
