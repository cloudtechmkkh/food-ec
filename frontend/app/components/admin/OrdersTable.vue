<template>
    <table class="orders-table">
        <thead>
            <tr>
                <th>注文ID</th>
                <th>ユーザー名</th>
                <th>合計金額</th>
                <th>ステータス</th>
                <th>注文日時</th>
                <th>詳細</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="order in orders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.user_name }}</td>
                <td>{{ order.total_price }}</td>
                <td>{{ order.status }}</td>
                <td>{{ order.created_at }}</td>
                <td>
                    <NuxtLink :to="`/admin/orders/${order.id}`">
                        詳細
                    </NuxtLink>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
defineProps<{
    orders: any[];
}>()
</script>

<style scoped>
.orders-table {
    width: 100%;
    border-collapse: collapse;
}
.orders-table th,
.orders-table td {
    border: 1px solid #ddd;
    padding: 8px;
}
</style>