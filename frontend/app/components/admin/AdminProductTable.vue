<template>
    <table class="product-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>商品名</th>
                <th>カテゴリ</th>
                <th>価格</th>
                <th>温度帯</th>
                <th>作成日</th>
                <th>編集</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="p in products" :key="p.id">
                <td>{{ p.id }}</td>
                <td>{{ p.name }}</td>
                <td>{{ p.category_name }}</td>
                <td>{{ p.price }}</td>
                <td>{{ p.temperature_zone }}</td>
                <td>{{ p.created_at }}</td>
                <td>
                    <NuxtLink :to="`/admin/products/${p.id}`">
                        編集
                    </NuxtLink>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
defineProps<{
    products: any[];
}>();
</script>

<style scoped>
.product-table {
    width: 100%;
    border-collapse: collapse;
}
.product-table th,
.product-table td {
    border: 1px solid #ddd;
    padding: 8px;
}
</style>