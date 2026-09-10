<template>
    <div class="login">
        <h1>管理者ログイン</h1>

        <form @submit.prevent="login">
            <label for="email">メールアドレス</label>
            <input id="email" v-model="email" type="email"/>

            <label for="password">パスワード</label>
            <input id="password" v-model="password" type="password"/>

            <button type="submit">ログイン</button>
        </form>

        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const email = ref('');
const password = ref('');
const error = ref('');

const auth = useAuth();

const login = async () => {
    try {
        await auth.login(email.value, password.value);
        navigateTo('/admin/products')
    } catch (e: any) {
        error.value = e.message || 'ログインに失敗しました';
    }
};
</script>

<style scoped>
.login {
    max-width: 400px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.login form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.error {
    color: red;
}
</style>