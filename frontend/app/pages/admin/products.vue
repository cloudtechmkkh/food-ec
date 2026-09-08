<template>
    <div>
        <h1>商品管理</h1>

        <AdminProductTable :products="products" />
    </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import AdminProductTable from '~/components/admin/AdminProductTable.vue';

const api = useApi();
const products = ref<any[]>([]);

onMounted(async () => {
    products.value = await api.get('/api/admin/products');
});
</script>