<template>
    <main>
        <div v-if="loading" class="mt">
            <Loading :loading="loading" />
        </div>
        <Table v-else :listdata="clients" :updateComponent="getUsers" />
    </main>
</template>

<script>
import { onMounted } from "vue";
import Table from "@/components/Table.vue";
import Loading from "@/components/Loading.vue";

import useFetch from "../composables/useFetch";

export default {
    components: {
        Table,
        Loading,
    },
    setup() {
        const { results, hasErrors, loading, execute } = useFetch();

        function getUsers() {
            execute("http://localhost:8181/users");
        }

        onMounted(() => {
            getUsers();
        });

        return {
            clients: results,
            loading,
            hasErrors,
            getUsers
        };
    },
};
</script>