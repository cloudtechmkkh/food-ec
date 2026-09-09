<template>
    <div>
        <h1>商品追加</h1>

        <AdminProductForm 
        :product="form"
        @save="save"
        />
    </div>
</template>

<script setup lang="ts">
import AdminProductForm from '~/components/admin/AdminProductForm.vue';
import { useApi } from '~/composables/useApi';

const api = useApi();

const form = reactive({
    name: '',
    price: 0,
    category_id: 1,
    temperature_zone: 'ambient',
    ingredients: '',
    allergies: ''
});

const save = async (data: any) => {
    await api.post('api/admin/products', data);
    alert('商品を追加しました');
    navigateTo('/admin/products');
}
</script>