<template>
    <div class="modal-container" @click="$emit('close')">
        <div v-if="loading" class="mt">
            <Loading :loading="loading" />
        </div>

        <div v-else class="modal" @click.stop>
            olá
            <button type="button" class="close" @click="emit('close')">
                X Close
            </button>
            <FormInput :user="userProperties" :putSubmit="putSubmit" />
        </div>
    </div>
</template>

<script>
import FormInput from "@/components/FormInput.vue";
import Loading from "@/components/Loading.vue";

import useFetch from "../composables/useFetch";
import { ref } from "@vue/reactivity";

export default {
    components: {
        FormInput,
        Loading,
    },
    props: {
        userData: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emit }) {
        const { loading, execute } = useFetch();

        const userProperties = ref({
            name: "",
            email: "",
            cpf: "",
            phone: "",
            uf: "",
        });

        userProperties.value = props.userData;

        function putSubmit(user) {
            execute(`http://localhost:8888/${user.id}`, "PUT", user).finally(
                () => {
                    emit("close");
                }
            );
        }

        return {
            userProperties,
            loading,
            putSubmit,
        };
    },
};
</script>

<style scoped>
.close {
    color: #000;
    font-weight: bold;
    background-color: #fff;
}
.close:hover {
    opacity: 0.4;
    transition: 0.8s ease;
}
</style>
