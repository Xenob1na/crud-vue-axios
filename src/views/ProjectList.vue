<template>
    <LayoutDiv>
        <div class="container" v-if="projects">
            <h2 class="text-center mt-5 mb-3">Project Manager</h2>
            <div class="card">
                <div class="card-header">
                    <router-link
                    to="/create"
                    class="btn btn-outline-info float-right"
                    >Creat New Project</router-link>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Body</th>
                                <th width="250px">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(project, idx) in projects" :key="project.id">
                                <td>{{ project.title }}</td>
                                <td>{{ project.body }}</td>
                                <td>
                                    <router-link
                                    :to="`/show/${project.id}`"
                                    class="btn btn-outline-info mx-1"
                                    >
                                        Show
                                    </router-link>
                                    <router-link 
                                    :to="`/create/${project.id}`" 
                                    class="btn btn-outline-success mx-1">
                                        Edit
                                    </router-link>
                                    <button
                                    @click="handleDelete(project.id)"
                                    class="btn btn-outline-danger mx-1"
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       <div class="row" v-else style="margin-top: 300px; margin-left: 300px;">
            <div class="w-50 mx-auto">
                <div class="spinner-border" role="status" ></div>
            </div>
        </div>
    </LayoutDiv>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import {ref, onMounted} from 'vue'
import LayoutDiv from '../components/LayoutDiv.vue';

const projects = ref(null);

onMounted(() => {
    axios
    .get('http://localhost:3000/posts')
    .then(response => {
        projects.value = response.data;
        return console.log(response);
    })
    .catch(error => {
        return error
    })
})

function handleDelete(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios
            .delete(`http://localhost:3000/posts/${id}`)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Project deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
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
        }
    })
}
</script>