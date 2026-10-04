<template>
    <form class="form" @submit.prevent="submit">
        <label>商品名</label>
        <input v-model="form.name" />

        <label>価格</label>
        <input type="number" v-model="form.price" />

        <label>カテゴリ</label>
        <select v-model="form.category_id">
            <option value="1">生鮮食品</option>
            <option value="2">加工食品</option>
            <option value="3">お菓子</option>
            <option value="4">飲料</option>
        </select>

        <label>温度帯</label>
        <select v-model="form.temperature_zone">
            <option value="ambient">常温</option>
            <option value="chilled">冷蔵</option>
            <option value="frozen">冷凍</option>
        </select>

        <label>原材料</label>
        <textarea v-model="form.ingredients"></textarea>

        <label>アレルギー</label>
        <textarea v-model="form.allergies"></textarea>

        <button type="submit">保存</button>
    </form>
</template>

<script setup lang="ts">
const props = defineProps<{ product: any }>();
const emit = defineEmits(['save']);

const form = reactive({ ...props.product });

const submit = () => {
    emit('save', form);
};
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 400px;
}
</style>