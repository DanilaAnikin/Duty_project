
<script setup>
import { supabase } from '@/supabase';
import { onMounted, ref } from 'vue';
import Cookies from 'js-cookie'


const username = ref([]);
const password = ref([]);
const admin = ref(false)
const user = ref([])

const props = defineProps(['admin'])
const emit = defineEmits(['set-admin'])


const checkAll = async() => {
    const {data} = await supabase.from("Admins").select().eq('user', username.value).eq('password', password.value).select();
    user.value = data

    if(user.value == null || user.value.length == 0){
        emit('set-admin', false)
        Cookies.set("logged", "false")
    } else{
        Cookies.set("logged", "true")
        emit('set-admin', true)
    }
    window.location.href="#"
}

const logOut = () => {
    emit('set-admin', false)
    Cookies.set("logged", "false")
}


</script>



<template>
    <div v-if="props.admin == false" class="container">
        <h2 class="text-center">Login</h2>
        <br>
        <div class="input-group">
            <label for="username" class="label">Username</label>
            <input type="text" name="username" v-model="username" id="username" class="input">
            <span class="error-message"></span>
        </div>
        <br>
        <div class="input-group">
            <label for="password" class="label">Password</label>
            <input type="password" name="password" v-model="password" id="password" class="input">
            <span class="error-message"></span>
        </div>
        <br>
        <button class="button" @click="checkAll()">Login</button>
    </div>
    <button v-else @click="logOut()" class="logout-btn"><h2>Log Out</h2></button>
</template>

<style scoped lang="scss">
    $primary: rgb(0, 132, 255);
    $error: red;

    * {
        box-sizing: border-box;
    }

    body {
        font-family: "Open Sans", sans-serif;
        background-color: $primary;
        font-size: 16px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        padding: 0;
        margin: 0;
    }

    .logout-btn{
        color: #F0F0F0;
        background-color: #800000;
        border-radius: 16px;
        height: 8vh;
        width: 20%;
        margin-left: 40%;
        margin-top: 15%;
        display: inline-block;
        text-align: center;
        border: none;
    }

    .container {
        border-radius: 16px;
        max-width: 80%;
        margin: 0 auto;
        margin-top: 10%;
        padding: 1rem;
        background-color: #303030;
        color: #C0C0C0;
    }

    .text-center {
        text-align: center;
    }

    .login {
        .container {
            max-width: 460px;
            margin: 3rem auto;
            padding: 2rem;
            border: 1px solid #ddd;
            border-radius: 0.25rem;
            background-color: #404040;
        }
    }

    .input {
        appearance: none;
        display: block;
        width: 100%;
        color: #333;
        border: 1px solid rbg(180, 180, 180);
        background-color: white;
        padding: 1rem;
        border-radius: 0.25rem;
        &.input-error {
            border: 1px solid $error;
            &:focus {
                border: 1px solid $error;
            }
        }
        &:focus {
            outline: none;
            border: 1px solid $primary;
            background-clip: padding-box;
        }
    }

    .error-message {
        font-size: 0.85rem;
        color: $error;
    }

    .button {
        background-color: #585858;
        padding: 1rem;
        border: none;
        color: #fff;
        font-weight: bold;
        display: block;
        width: 100%;
        text-align: center;
        cursor: pointer;
        font-size: 1rem;
        &:hover {
            filter: brightness(110%);
        }
    }

    @media only screen and (max-width: 600px){
        .container {
            margin-top: 30vh;
        }
        .logout-btn{
            margin: 0;
            margin-left: 17%;
            margin-top: 50%;
            width: 30vh;
            height: 10vh;
        }
    }

</style>