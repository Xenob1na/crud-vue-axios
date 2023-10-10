<template>
    <LayoutDiv>
        <h2 class="text-center mt-5 mb-5">Create New Project</h2>
        <div class="card">
            <div class="card-header">
                <router-link to="/" class="btn btn-outline-info float-right">View all projects</router-link>
            </div>
            <div class="card-body">
                <form @submit.prevent="">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text"  id="title" class="form-control" v-model="postData.title">
                    </div>
                    <div class="form-group">
                        <label for="body">Body</label>
                        <textarea id="body" class="form-control" v-model="postData.body" rows="3"></textarea>
                    </div>
                    <button
                    class="btn btn-outline-primary mt-3"
                    @click="handleSave"
                    type="button"
                    >
                    <span :class="{'d-none': isSaving}">Save Project</span>
                    <div class="spinner-border" role="status" v-if="isSaving"></div>
                    </button>
                </form>
            </div>
        </div>
    </LayoutDiv>
</template>

<script setup>
import LayoutDiv from '../components/LayoutDiv.vue'
import {ref} from 'vue'
import axios from 'axios';
import Swal from 'sweetalert2';

const postData = ref({
    title: '',
    body: '',
    userId: 1
})
const isSaving = ref(false);

function handleSave() {
    isSaving.value = true;
    axios
    .post('http://localhost:3000/posts', postData.value)
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