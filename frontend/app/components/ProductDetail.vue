<template>
    <div class="detail-card">
        <h2>{{ product.name }}</h2>

        <p>価格：{{ product.price }}円</p>
        <p>カテゴリ：{{ product.category_name }}</p>
        <p>温度帯：{{ product.temperature_zone }}</p>

        <h3>アレルギー</h3>
        <p>{{ product.allergies || 'なし' }}</p>

        <h3>栄養成分</h3>
        <pre>{{ product.nutrition_json }}</pre>

        <h3>ロット情報</h3>
        <p>ロット番号：{{ product.lot_no }}</p>
        <p>製造日：{{ product.manufactured_at }}</p>
        <p>賞味期限：{{ product.expire_at }}</p>
        <p>ロット在庫：{{ product.lot_stock }}</p>

        <button @click="$emit('addToCart', product)">
            カートに追加
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    product: any;
}>();
</script>

<style scoped>
.detail-card {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
}
</style>