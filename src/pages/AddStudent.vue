<script setup>
import { supabase } from '@/supabase';
import {ref} from 'vue'

const students = ref([])

const firstname = ref([])
const lastname = ref([])
const group = ref([])
const active = ref([])


    const addStudent = async() => {

        if(group.value !== "1" && group.value !== "2"){
            alert("Please enter a correct group! (1 or 2)")
            return
        }
        if(active.value !== "true" && active.value !== "false"){
            alert("Please enter a correct form of BOOLEAN!!")  
            return
        }
        


        const {thoseData} = await supabase.from("Students").upsert(
        {
            "firstname": firstname.value,
            "lastname": lastname.value,
            "group": group.value,
            "active": active.value,
            "lastFrom": "2022_01_01",
            "lastTo": "2022_01_08",
            "count": 0
        })


        firstname.value = []
        lastname.value = []
        group.value = []
        active.value = []
        window.location.href = "#/students-table";
    }


</script>

<template>
    <div class="change-student-whole">
        <div class="header"><h1>Student</h1></div>
        <button class="btn-add" @click="addStudent()"><h2>Add Student</h2></button>
        <div class="all-form">
            <div class="firstname">
                <h3>First Name</h3>
                <input type="text" id="fname" name="firstname" v-model="firstname" placeholder="Firstname..">
            </div>
            <div class="lastname">
                <h3>Last Name</h3>
                <input type="text" id="lname" name="lastname" v-model="lastname" placeholder="Lastname..">
            </div>
            <div class="group">
                <h3>Group</h3>
                <input type="text" id="group" name="group" v-model="group" placeholder="Group..">
            </div>
            <div class="active">
                <h3>Active</h3>
                <input type="text" id="active" name="active" v-model="active" placeholder="True/False..">
            </div>
        </div>
    </div>
</template> 



<style scoped>
    .change-student-whole{
        width: 20vw;
        height: 30vw;
        border-radius: 16px;
        margin: auto;
        margin-top: 10%;
        color: #F0F0F0;
        background-color: #585858;
    }
    .header{
        display: inline-block;
        width: 40%;
        height: auto;
        padding-top: 5%;
        text-align: center;
        margin-left: 5%;
    }
    .btn-add{
        color: #F0F0F0;
        background-color: #228B22;
        border-radius: 8px;
        height: 8%;
        width: 30%;
        display: inline-block;
        text-align: center;
        margin-left: 15%;
    }
    .all-form{
        border-radius: 16px;
        background-color: #686868;
        width: 80%;
        height: 75%;
        margin-left: 10%;
    }
    h3{
        margin-left: 10%;
    }
    input{
        margin-left: 15%;
        width: 50%;
        background-color: #F0F0F0;
        border-radius: 8px;
        padding: 12px;
    }
    .firstname{
        padding-top: 3%;
        margin-top: 10%;
    }
    .lastname{
        margin-top: 10%;
    }
    .group{
        margin-top: 10%;
    }
    .active{
        margin-top: 10%;
    }
</style>
