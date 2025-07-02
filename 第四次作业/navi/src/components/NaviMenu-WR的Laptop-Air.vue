<template>
    <div class = "menu">
        <ul>
            <li :class
                v-for = "(item, index) in menuItems"
                :key = "index"
            >
                {{ item.label }}            
            </li>
        </ul>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const menuItems = reactive([
    {label: "首页"},
    {label: "教师目录"},
    {label: "房间目录"},
    {label: "地图俯瞰"}
])

</script>

<style scoped>
.menu{
    height: 70px;
    background-color: #F6F6F6;
    width: 100vw;
    min-width: 1080px;
    border-bottom: 1px solid #dcdcdc;
}

.menu ul{
    float: left;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}

.menu li{
    width: 150px;
    height: 100%;
    position: relative;

    font-size: 18px;
    cursor: pointer;
    list-style: none;
    text-align: center;
}


</style>