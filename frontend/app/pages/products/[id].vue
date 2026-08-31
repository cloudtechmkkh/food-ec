<template>
    <div>
        <h1>商品詳細</h1>

        <div v-if="product">
            <ProductDetail :product="product" @addToCart="addToCart" /> 
        </div>

        <p v-else>商品を読み込み中...</p>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useApi } from '~/composables/useApi';
import ProductDetail from '~/components/ProductDetail.vue';
import { useCart } from '~/composables/useCart';    

const api = useApi();
const route = useRoute();
const cart = useCart();
const product = ref<any>(null);

const fetchProduct = async () => {
    const { id } = route.params;
    product.value = await api.get(`/api/products/${id}`);
};

const addToCart = (item: any) => {
    console.log('カートに追加：', item);
    // ここにカート追加の処理を実装
    cart.addToCart(item, 1);
    alert('カートに追加しました');
}

onMounted(fetchProduct);
</script>