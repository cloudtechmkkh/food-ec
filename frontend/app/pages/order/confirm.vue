const api = useApi();
const cart = useCart();

const submitOrder = async () => {
    const res = await api.post('/orders', {
        items: cart.cart.value,
        addressId: selectedAddress.value,
        paymentMethodId: paymentMethodId.value,
    });

    alert('注文が完了しました')
    cart.clearCart();
    navigateTo('/order/complete')
}