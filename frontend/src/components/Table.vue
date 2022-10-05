<template>
    <div class="mt" v-if="loading">
        <Loading :loading="loading" />
    </div>

    <div v-else>
        <table class="container" v-if="listdata.length > 0">
            <thead>
                <tr id="trheader">
                    <th scope="col">Name</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telephone</th>
                    <th scope="col">UF</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="value in listdata" :key="value.id">
                    <td data-label="Nome">{{ value.name }}</td>
                    <td data-label="CPF">{{ value.cpf }}</td>
                    <td data-label="Email">{{ value.email }}</td>
                    <td data-label="Telefone">{{ value.phone }}</td>
                    <td data-label="UF">{{ value.uf }}</td>
                    <td data-label="Ações" class="todo-button">
                        <img
                            src="../assets/edit.svg"
                            alt="Edit"
                            title="Edit Custumers"
                            @click="openModal(value)"
                        />
                        <img
                            src="../assets/delete.svg"
                            alt="Delete"
                            title="Delete Custumers"
                            @click="handleDelete(value.id, value.name)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="container centered-text" v-else>
            <h2>No registered customers at the moment</h2>
            <br />
            <h3>Start by accessing the "Register Customer" tab above.</h3>
        </div>
    </div>

    <ModalUpdate v-if="userData" :userData="userData" @close="closeModal" />
</template>

<script>
import ModalUpdate from "@/components/ModalUpdate.vue";
import Loading from "@/components/Loading.vue";

import useFetch from "../composables/useFetch";
import { ref } from "@vue/runtime-core";

export default {
    components: {
        ModalUpdate,
        Loading,
    },
    props: {
        listdata: {
            type: Array,
            required: true,
        },
        updateComponent: { type: Function },
    },
    setup(props) {

        const { loading, execute } = useFetch();

        const userData = ref(null);

        function openModal(user) {
            userData.value = user;
        }

        function closeModal() {
            userData.value = null;
        }

        function handleDelete(id, name) {
            const confirmation = confirm(
                `Do you really want to delete the customer? ${name}?`
            );

            if (confirmation) {
                execute(`http://localhost:8181/users/${id}`, "DELETE").finally(
                    () => {
                        props.updateComponent();
                    }
                );
            }
        }

        return {
            closeModal,
            loading,
            handleDelete,
            openModal,
            userData,
        };
    },
    // data() {
    //     return {
    //         userModal: null,
    //         loading: false,
    //     };
    // },
    // watch: {
    //     userModal() {
    //         this.updateComponent();
    //     },
    // },
    // methods: {
    //     handleDelete(id, name) {
    //         const confirmation = confirm(
    //             `Do you really want to delete the customer? ${name}?`
    //         );

    //         if (confirmation) {
    //             this.loading = true;
    //             fetch(
    //                 process.env.NODE_ENV === "development"
    //                     ? `http://localhost:8888/${id}`
    //                     : `192.168.0.1:8888/${id}`,
    //                 {
    //                     method: "DELETE",
    //                 }
    //             )
    //                 .then((res) => res.json())
    //                 .then((data) => {
    //                     this.loading = false;
    //                     this.updateComponent();
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                     this.loading = false;
    //                 });
    //         }
    //     },
    //     openModal(id) {
    //         this.userModal = id;
    //     },
    //     closeModal() {
    //         this.userModal = null;
    //     },
    // },
};
</script>

