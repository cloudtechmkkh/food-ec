<template>
    <div class="order-summary">
        <h2>注文内容</h2>

        <div v-for="item in items" :key="item.id" class="item">
            <p>{{ item.name }} * {{ item.quantity }}</p>
            <p>{{ item.price * item.quantity }}円</p>
        </div>

        <h3>合計：{{ totalPrice }}円</h3>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    items: any[];
    totalPrice: number;
}>();
</script>

<style scoped>
.item {
    border-bottom: 1px solid #ddd;
    padding: 8px 0;
}
</style>