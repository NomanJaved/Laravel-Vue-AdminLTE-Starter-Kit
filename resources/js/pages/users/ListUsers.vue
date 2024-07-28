<script setup>
import axios from 'axios';
import {onMounted, reactive, ref} from "vue";
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

const users = ref([]);



const form = reactive({
    name : '',
    email : '',
    password : ''
});

const getUsers = async () => {
    try {
        const response = await axios.get('/api/users');
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

const schema = yup.object({
    name : yup.string().required(),
    email : yup.string().email().required(),
    password : yup.string().required().min(8),
})

// Define a method to format the date
const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}



const createUser = (values, { resetForm }) => {
    axios.post('/api/users', values)
        .then((response) => {
            users.value.unshift(response.data);
            $("#createUserModal").modal('hide');
            resetForm();
        })
}

// const createUser = () => {
//     axios.post('/api/users', form)
//         .then((response) => {
//             users.value.unshift(response.data);
//             form.name = '';
//             form.email = '';
//             form.password = '';
//             $("#createUserModal").modal('hide');
//         });
// }

onMounted(() => {
    getUsers();
});

</script>

<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Users</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Users </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>


    <div class="content">
        <div class="container-fluid">

            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-primary mb-3 float-right" data-toggle="modal" data-target="#createUserModal">
                        Add New User
                    </button>
                </div>




                <div class="col-12">

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">DataTable with minimal features &amp; hover style</h3>
                        </div>

                        <div class="card-body">
                            <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
                                <div class="row">
                                    <div class="col-sm-12 col-md-6"></div>
                                    <div class="col-sm-12 col-md-6"></div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <table id="example2" class="table table-bordered table-hover dataTable dtr-inline" aria-describedby="example2_info">
                                            <thead>
                                            <tr>
                                                <th class="sorting sorting_asc" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">Serial No.</th>
                                                <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending">Name</th>
                                                <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Email</th>
                                                <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Created</th>
                                                <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(user, index) in users"
                                                v-bind:key="user.id"
                                                v-bind:class="{'even-row': (index + 1) % 2 === 0, 'odd-row': (index + 1) % 2 !== 0}"
                                            >
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ user.name }}</td>
                                                <td>{{ user.email }}</td>
                                                <td>{{ formatDate(user.created_at) }}</td>
                                                <td><span class="badge badge-info">Active</span></td>
                                            </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>


                </div>



                <!-- Modal -->
                <div class="modal fade" id="createUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <Form @submit="createUser" :validation-schema="schema" v-slot="{ errors }">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Create New User</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <Field name="name" type="text" class="form-control" v-bind:class="{'is-invalid' : errors.name }" id="name" placeholder="Enter name" />
                                            <span class="invalid-feedback">{{ errors.name }}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <Field name="email" type="email" class="form-control" v-bind:class="{'is-invalid' : errors.email }" id="email" placeholder="Enter email" />
                                            <span class="invalid-feedback">{{ errors.email }}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="password">Password</label>
                                            <Field name="password" type="password" class="form-control" v-bind:class="{'is-invalid' : errors.password }" id="password" placeholder="Enter password" />
                                            <span class="invalid-feedback">{{ errors.password }}</span>
                                        </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    </div>
</template>
