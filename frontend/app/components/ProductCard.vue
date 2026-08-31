<template>
    <div class="product-card">
        <h3>{{  product.name  }}</h3>
        <p>価格：{{  product.price  }}</p>
        <p>温度帯：{{  product.temperature_zone  }}</p>
        <p v-if="product.expire_at">賞味期限：{{  product.expire_at  }}</p>

        <NuxtLink :to="`/products/${product.id}`">
            詳細を見る
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    product: any;
}>();
</script>

<style scoped>
.product-card {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
}
</style>