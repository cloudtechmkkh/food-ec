<template>
    <div>
        <h1>商品編集</h1>

        <AdminProductForm
        v-if="product"
        :product="product"
        @save="save"
        />

        <p v-else>読み込み中...</p>
    </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import { useRoute } from 'vue-router';
import AdminProductForm from '~/components/admin/AdminProductForm.vue';

const api = useApi();
const route = useRoute();

const product = ref<any>(null);

onMounted(async () => {
    product.value = await api.get(`/api/admin/products/${route.params.id}`);
});

const save = async (updated: any) => {
    await api.put(`/api/admin/products/${route.params.id}`, updated);
    alert('更新しました');
    navigateTo('/admin/products');
}
</script>