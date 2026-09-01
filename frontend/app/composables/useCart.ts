export const useCart = () => {
    const cart = useState<any[]>('cart', () => [])

    const loadCart = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('cart');
            cart.value = saved ? JSON.parse(saved) : [];
        }
    }

    onMounted(loadCart);

    const saveCart = () => {
        if (import.meta.client) {
            localStorage.setItem('cart', JSON.stringify(cart.value));
        }
    }

    const addToCart = (product: any, quantity = 1) => {
        const existing = cart.value.find((item) => item.id === product.id);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.value.push({
                id: product.id,
                name: product.name,
                price: product.price,
                temperature_zone: product.temperature_zone,
                quantity
            });
        }
        saveCart();
    }

    const removeFromCart = (productId: number) => {
        cart.value = cart.value.filter((item) => item.id !== productId);
        saveCart();
    }

    const updateQuantity = (productId: number, quantity: number) => {
        const item = cart.value.find((i) => i.id === productId);
        if (item) {
            item.quantity = quantity;
            saveCart();
        }
    }

    const clearCart = () => {
        cart.value = [];
        saveCart();
    }

    const totalPrice = computed(() => 
        cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    return {
        cart,
        loadCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice
    }
}