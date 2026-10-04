<template>
    <div>
        <h1>注文詳細</h1>

        <OrderDetail v-if="order" :order="order" />
        <p v-else>読み込み中...</p>
    </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi'
import OrderDetail from '~/components/admin/OrderDetail.vue'

const api = useApi()
const route = useRoute()

const order = ref<any>(null);

onMounted(async () => {
    const id = route.params.id;
    order.value = await api.get(`/api/admin/orders/${id}`);
})
</script>