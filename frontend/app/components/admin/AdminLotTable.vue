<template>
    <div>
        <h2>ロット一覧</h2>

        <table>
            <thead>
                <tr>
                    <th>ロット番号</th>
                    <th>製造日</th>
                    <th>賞味期限</th>
                    <th>在庫</th>
                    <th>編集</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="lot in lots" :key="lot.id">
                    <td><input v-model="lot.lot_no" /></td>
                    <td><input v-model="lot.manufactured_at" /></td>
                    <td><input v-model="lot.expire_at" /></td>
                    <td><input v-model="lot.stock" /></td>
                    <td>
                        <button @click="save(lot)">保存</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <h2>ロット追加</h2>

        <form @submit.prevent="create">
            <input v-model="newLot.lot_no" placeholder="ロット番号" />
            <input type="date" v-model="newLot.manufactured_at" />
            <input type="date" v-model="newLot.expire_at" />
            <input type="number" v-model="newLot.stock" placeholder="在庫" />
            <button type="submit">追加</button>
        </form>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    lots: any[]
}>();
const emit = defineEmits(['update', 'create']);

const newLot = reactive({
    lot_no: '',
    manufactured_at: '',
    expire_at: '',
    stock: 0
});

const save = (lot: any) => {
    emit('update', lot.id, lot);
};

const create = () => {
    emit('create', newLot);
    newLot.lot_no = '';
    newLot.manufactured_at = '';
    newLot.expire_at = '';
    newLot.stock = 0;
};
</script>