<script setup>
import { ref, computed, onMounted } from 'vue';
import Dashboard from '@/pages/DashBoard.vue';
import StudentsTable from "@/pages/StudentsTable.vue";
import AddStudent from "@/pages/AddStudent.vue"
import Login from "@/pages/LoginPlease.vue"
import Cookies from 'js-cookie'


const admin = ref(false)

const routes = {
    "/": {
        component: Dashboard,
        title: "Dashboard",
        protected: false
    },
    "/students-table": {
        component: StudentsTable,
        title: "Students table",
        protected: false
    },
    "/add-student": {
        component: AddStudent,
        title: "Add Student",
        protected: true
    },
    "/login": {
        component: Login,
        title: "Login / Logout",
        protected: false
    }
}

const currentProtected = computed(() => {
    return routes[currentPath.value.slice(1) || '/'].protected || false;
})

onMounted(() => {admin.value = Cookies.get("logged") === "true"})

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
    console.log('hash change');
    currentPath.value = window.location.hash;
})


const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/'].component || <a>not found</a>
})

</script>

<template>
    <div class="menu">
        <div>
            <a v-for="(route, index) in Object.keys(routes)" :key="index" :href="`#${route}`">{{routes[route].title}}</a>
        </div>
    </div>
    <div class="content">
        <component v-if="admin || !currentProtected" :is="currentView" :admin="admin" @set-admin="admin = $event"/>
        <div v-else><h1 class="sorka">Sorry, but only admins can see this page.</h1></div>
    </div>
</template>

<style scoped lang="scss">

$menuHeight: 50px;

.sorka{
    margin-top: 20%;
    text-align: center;
    color: #800000;
}
.menu {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: $menuHeight;
    background-color: #505050;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0 30px;

    a {
        margin: 0 15px;
        text-decoration: none;
        color: white;
        font-weight: 600;
        transition: color 100ms;

        &:hover {
            color: #777777;
       }
    }
}

.content {
  margin-top: $menuHeight;
}

@media only screen and (max-width: 600px){
    .menu{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        height: $menuHeight;
        background-color: #505050;
    }
}

</style>