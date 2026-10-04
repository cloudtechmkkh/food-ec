<template>
    <div>
        <h1>注文一覧</h1>

        <OrdersTable :orders="orders" />
    </div>
</template>

<script setup lang="ts">
import OrdersTable from '~/components/admin/OrdersTable.vue'
import { useApi } from '~/composables/useApi'

const api = useApi()
const orders = ref<any[]>([])

onMounted(async () => {
    orders.value = await api.get('api/admin/orders');
});
</script>