<template>
    <div>
        <h1>商品一覧</h1>

        <!--　絞り込みフォーム　-->
        <div class="filters">
            <select v-model="categoryId">
                <option value="">カテゴリを選択</option>
                <option value="1">生鮮食品</option>
                <option value="2">加工食品</option>
                <option value="3">お菓子</option>
                <option value="4">飲料</option>
            </select>

            <select v-model="temperatureZone">
                <option value="">温度帯を選択</option>
                <option value="ambient">常温</option>
                <option value="chilled">冷蔵</option>
                <option value="frozen">冷凍</option>
            </select>

            <button @click="fetchProducts">検索</button>
        </div>

        <!--　商品一覧　-->
        <div v-if="products.length > 0">
            <ProductCard
                v-for="p in products"
                :key="p.id"
                :product="p"
            />
        </div>

        <p v-else>商品がありません</p>
    </div>
</template>

<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue';
import { useApi } from '~/composables/useApi';

const api = useApi();

const products = ref<any[]>([]);
const categoryId = ref('');
const temperatureZone = ref('');

const fetchProducts = async () => {
    products.value = await api.get<any[]>('/api/products', {
        categoryId: categoryId.value || undefined,
        temperatureZone: temperatureZone.value || undefined,
    });
}

// 初回ロード
onMounted(fetchProducts);
</script>

<style scoped>
.filters {
    margin-bottom: 20px;
}
.filters select {
    margin-right: 10px;
}
</style>