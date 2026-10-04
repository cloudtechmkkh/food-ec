<template>
    <div class="order-detail">
        <h2>注文ID：{{ order.id }}</h2>

        <h3>ユーザー情報</h3>
        <p>{{ order.user_name }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    order: any;
}>();
</script>

<style scoped>
.order-detail {
    padding: 20px;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}
th, td {
    border: 1px solid #ddd;
    padding: 10px;
}
</style>