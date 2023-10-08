<template>
    <LayoutDiv>
        <h2 class="text-center mt-5 mb-5">Create New Project</h2>
        <div class="card">
            <div class="card-header">
                <router-link to="/" class="btn btn-outline-info float-right">View all projects</router-link>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" class="form-control" v-model="name">
                    </div>
                    <div class="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" class="form-control" v-model="description" rows="3"></textarea>
                    </div>
                    <button
                    class="btn btn-outline-primary mt-3"
                    @click="handleSave"
                    :disabled="isSaving"
                    type="button"
                    >
                    Save Project
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

const name = ref('');
const description = ref('');
const isSaving = ref(false);

function handleSave() {
    isSaving.value = true;
    axios.post('https://mock-api.binaryboxtuts.com/api/projects', name.value, description.value)
    .then(response => {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            showConfirmButton: false,
            timer: 1500
        })
        isSaving.value = false;
        name.value = '';
        description.value = '';
        return response;
    })
    .catch(error => {
        isSaving.value = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: false,
            timer: 1500
        })
        name.value = '';
        description.value = '';
        return error
    })
}
</script>