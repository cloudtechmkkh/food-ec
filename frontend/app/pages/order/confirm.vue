<template>
    <div>
        <h1>注文確認</h1>

        <!-- 注文内容 -->
        <OrderSummary :items="cart" :totalPrice="totalPrice" />

        <!-- 配送先選択 -->
        <div class="section">
            <h2>配送先</h2>

            <select v-model="addressId">
                <option disabled value="">配送先を選択してください</option>
                <option
                v-for="addr in addresses"
                :key="addr.id"
                :value="addr.id"
                >
                {{ addr.prefecture }} {{ addr.city }} {{ addr.address_line }}
                </option>
            </select>
        </div>

        <!-- 支払方法 -->
        <div>
            <h2>支払方法</h2>
            <input 
                type="text"
                v-model="paymentMethodId"
                placeholder="Stripe PaymentMethod ID"
            />
        </div>

        <button @click="submitOrder" class="submit-btn">
            注文を確定する
        </button>
    </div>
</template>

<script setup lang="ts">
import OrderSummary from '~/components/OrderSummary.vue';
import { useCart } from '~/composables/useCart';
import { useApi } from '~/composables/useApi';

const api = useApi();
const cartStore = useCart();

const cart = cartStore.cart.value;
const totalPrice = cartStore.totalPrice.value;

const addressId = ref('');
const paymentMethodId = ref('');
const addresses = ref<any[]>([]);

// 配送先取得 （本来は /addresses API を作る）
onMounted(async () => {
    addresses.value = await api.get('/addresses');
});

const submitOrder = async () => {
    if (!addressId.value) {
        alert('配送先を選択してください');
        return;
    }

    if (!paymentMethodId.value) {
        alert('支払方法を入力してください');
        return;
    }

    const res = await api.post('api/orders', {
        items: cart,
        addressId: addressId.value,
        paymentMethodId: paymentMethodId.value,
    });

    alert('注文が完了しました')
    cartStore.clearCart();
    navigateTo('/order/complete')
}
</script>

<style scoped>
.section {
    margin-top: 20px;
}
.submit-btn {
    margin-top: 30px;
    padding: 12px 20px;
    background: #007bff;
    color: white;
    border-radius: 6px;
}
</style>