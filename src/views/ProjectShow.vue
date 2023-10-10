<template>
    <LayoutDiv>
        <h2 class="text-center mt-5 mb-3">Show Project</h2>
        <div class="card">
            <div class="card-header">
                <router-link
                class="btn btn-outline-info float-right"
                to="/"
                >
                View All Projects
                </router-link>
            </div>
            <div class="card-body">
                <b class="text-muted">Title</b>
                <p>{{ postData.title }}</p>
                <b class="text-muted">Body</b>
                <p>{{ postData.body }}</p>
            </div>
        </div>
    </LayoutDiv>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import {ref} from 'vue'
import LayoutDiv from '../components/LayoutDiv.vue';
import { useRoute } from 'vue-router';

const postData = ref({
    title: '',
    body: '',
})

const route = useRoute();
const id = route.params.id;

axios.get(`http://localhost:3000/posts/${id}`)
.then(response => {
    postData.value = response.data
    return console.log(response);
})
.catch(error => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        showConfirmButton: false,
        timer: 1500
    })
    return error
})
</script>