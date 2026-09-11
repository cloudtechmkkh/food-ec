<template>
    <div>
        <h1>在庫管理 (ロット) </h1>

        <AdminLotTable 
            :lots="lots"
            @update-lot="updateLot"
            @create-lot="createLot"
        />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useApi } from '~/composables/useApi'
import AdminLotTable from '~/components/admin/AdminLotTable.vue';

const api = useApi();
const route = useRoute();

const lots = ref<any[]>([]);

const load = async () => {
    lots.value = await api.get(`/admin/products/${route.params.id}/lots`);
};

onMounted(load);

const updateLot = async (lotId: number, data: any) => {
    await api.put(`/admin/lots/${lotId}`, data);
};

const createLot = async (data: any) => {
    await api.post(`/admin/products/${route.params.id}/lots`, data);
    await load();
};
</script>