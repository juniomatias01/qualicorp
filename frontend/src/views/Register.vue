<template>
    <div v-if="loading" class="mt">
        <Loading :loading="loading" />
    </div>
    <FormInput v-else :user="userProperties" :postSubmit="postSubmit" />
</template>

<script>
import FormInput from "@/components/FormInput.vue";
import Loading from "@/components/Loading.vue";

import useFetch from "../composables/useFetch";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
    components: {
        FormInput,
        Loading,
    },
    setup() {
        const { results, hasErrors, loading, execute } = useFetch();
        const route = useRouter();

        const userProperties = ref({
            name: "",
            email: "",
            cpf: "",
            phone: "",
            uf: "",
        });

        function postSubmit() {
            execute(
                "http://localhost:8181/users",
                "POST",
                userProperties.value
            ).finally(() => {
                route.push({ name: "Home" });
            });
        }

        return {
            postSubmit,
            userProperties,
            hasErrors,
            loading,
        };
    },
};
</script>
