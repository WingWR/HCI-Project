<template>
    <div class = "container">
        <input class="search-bar" v-model="input" @keyup.enter="submitSearch" type="text" placeholder="请输入房间或教师名" />
    </div>

</template>

<script setup>
import { ref } from 'vue'
const input = ref('')
const emit = defineEmits(['search'])

function submitSearch() {
    emit('search', input.value)
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 100px;
}

.search-bar {
    transform: translate(50%,50%);
    width: 85vh;
    height: 30px;
    border-radius: 10px;

}
</style>