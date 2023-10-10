<template>
    <LayoutDiv>
        <h2 class="text-center mt-5 mb-3">Edit Project</h2>
        <div class="card">
            <div class="card-header">
                <router-link 
                to="/"
                class="btn btn-outline-info float-right"
                >
                    View all Projects
                </router-link>
            </div>
            <div class="card-body">
                <form @submit.prevent="">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input 
                        type="text" 
                        id="title"
                        v-model="postData.title"
                        class="form-control"
                        >
                    </div>
                    <div class="form-group">
                        <label for="body">Body</label>
                        <textarea 
                        id="body"
                        v-model="postData.body"
                        class="form-control"
                        rows="3"
                        ></textarea>
                    </div>
                    <button
                    class="btn btn-outline-primary mt-3"
                    @click="handleSave"
                    type="button"
                    >
                    <span 
                    :class="{'d-none': isSaving}"
                    >Save Project</span>
                    <div class="spinner-border" role="status" v-if="isSaving"></div>
                    </button>
                </form>
            </div>
        </div>
    </LayoutDiv>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import LayoutDiv from '../components/LayoutDiv.vue';

const postData = ref({
    title: '',
    body: '',
    userId: 1
})

const isSaving = ref(false);
const route = useRoute();
const id = route.params.id;

axios.get(`http://localhost:3000/posts/${id}`)
.then(response => {
    let projectInfo = response.data;
    postData.title = projectInfo.title;
    postData.body = projectInfo.body;
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

function handleSave() {
    isSaving.value = true;
    axios.patch(`http://localhost:3000/posts/${id}`, postData.value)
    .then(response => {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            showConfirmButton: false,
            timer: 1500
        })
        isSaving.value = false;
        postData.value = '';
        return console.log(response);
    })
    .catch(error => {
        isSaving.value = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: false,
            timer: 1500
        })
        return error
    })
}
</script>