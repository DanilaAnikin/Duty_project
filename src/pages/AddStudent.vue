<script setup>
import { booleanLiteral } from '@babel/types';
import { supabase } from '@/supabase';
import {ref} from 'vue'

const students = ref([])

    const addStudent = async() => {
        const firstname = document.getElementById("fname").value;
        const lastname = document.getElementById("lname").value;
        let group = 1;
        let active = false;
        let groupBol
        let activeBol

        const activeId = document.getElementById("active").value
        const groupId = document.getElementById("group").value
        if(groupId == "1" || groupId == "2"){
            group = groupId
            groupBol = true
        } else{
            alert("Please enter a correct group! (1 or 2)")
            groupBol = false
        }

        if(activeId == "true" || activeId == "false"){
            active = activeId
            activeBol = true
        } else{
            alert("Please enter a correct form of BOOLEAN!!")
            activeBol = false
        }


        console.log(firstname, lastname, group, active)

        const { data } = await supabase.from('Students').select();

        students.value = data;
        

        if(groupBol && activeBol){
            const {thoseData} = await supabase.from("Students").upsert(
            {
                "id": students.value.length+1, 
                "firstname": firstname,
                "lastname": lastname,
                "group": group,
                "active": active,
                "lastFrom": null,
                "lastTo": null,
                "count": 0
            }).select()
        } else{
            alert("You wrote smth wrong")
        }



        document.getElementById("fname").value = ""
        document.getElementById("lname").value = ""
        document.getElementById("group").value = ""
        document.getElementById("active").value = ""
    }


</script>

<template>
    <div class="change-student-whole">
        <div class="header"><h1>Student</h1></div>
        <button class="btn-add" @click="addStudent()"><h2>Add Student</h2></button>
        <div class="all-form">
            <div class="firstname">
                <h3>First Name</h3>
                <input type="text" id="fname" name="firstname" placeholder="Firstname..">
            </div>
            <div class="lastname">
                <h3>Last Name</h3>
                <input type="text" id="lname" name="lastname" placeholder="Lastname..">
            </div>
            <div class="group">
                <h3>Group</h3>
                <input type="text" id="group" name="group" placeholder="Group..">
            </div>
            <div class="active">
                <h3>Active</h3>
                <input type="text" id="active" name="active" placeholder="True/False..">
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
