<template>
    <div>
        <h1>管理者登録</h1>

        <form @submit.prevent="register">
            <input v-model="email" placeholder="メールアドレス" />
            <input v-model="password" type="password" placeholder="パスワード" />
            <button type="submit">登録</button>
        </form>

        <p v-if="msg">{{ msg }}</p>
    </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';

const api = useApi();
const email = ref('');
const password = ref('');
const msg = ref('');

const register = async () => {
    await api.post('/auth/register-admin', {
        email: email.value, password: password.value
    })
    msg.value = '登録しました';
}
</script>