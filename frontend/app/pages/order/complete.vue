<template>
    <div class="complete">
        <h1>注文が完了しました</h1>

        <p>ご注文ありがとうございます。</p>
        <p>確認メールを送信しましたのでご確認ください。</p>

        <div class="actions">
            <NuxtLink to="/products">
                <button>商品一覧へ戻る</button>
            </NuxtLink>

            <NuxtLink to="/mypage">
                <button>マイページへ</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.complete {
    text-align: center;
    padding: 40px;
}
.actions {
    margin-top: 30px;
}
.actions button {
    margin: 0 10px;
    padding: 12px 20px;
    background: #007bff;
    color:white;
    border-radius: 6px;
}
</style>