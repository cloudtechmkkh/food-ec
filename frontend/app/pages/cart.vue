<template>
    <div>
        <h1>カート</h1>

        <div v-if="cart.length > 0">
            <div
                v-for="item in cart"
                :key="item.id"
                class="cart-item"
            >
                <h3>{{ item.name }}</h3>
                <p>価格：{{ item.price }}円</p>

                <input 
                    type="number"
                    min="1"
                    v-model.number="item.quantity"
                    @change="updateQuantity(item.id, item.quantity)"
                />

                <button @click="removeFromCart(item.id)">削除</button>
            </div>

            <h2>合計：{{ totalPrice }}円</h2>

            <NuxtLink to="/order/confirm">
                <button>注文へ進む</button>
            </NuxtLink>
        </div>

        <p v-else>カートは空です</p>
    </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart';

const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
</script>

<style scoped>
.cart-item {
    border: 1px solid #ddd;
    padding: 12px;
    margin-bottom: 10px;
}
</style>