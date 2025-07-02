<template>
  <div class="menu">
    <ul>
      <router-link 
        v-for="(item, index) in menuItems" 
        :key="index.label"
        :to="item.path" 
        class="menu-link"
      >
        <li 
          @mouseenter="hoveredIndex = index" 
          @mouseleave="hoveredIndex = null"
          @click="goTo(item.path)"
        > 
          <img :src="hoveredIndex == index ? item.graph_hover : item.graph">
          {{ item.label }}
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const hoveredIndex = ref('null')

const menuItems = reactive([
    {label: "首页", graph: "/Icon/Navi/home.svg", graph_hover: "/Icon/Navi/home-hover.svg", path: "/"},
    {label: "教师目录", graph: "/Icon/Navi/teacher.svg", graph_hover: "/Icon/Navi/teacher-hover.svg", path: "/Teachers"},
    {label: "房间目录", graph: "/Icon/Navi/menu.svg", graph_hover: "/Icon/Navi/menu-hover.svg", path: "/Rooms"},
    {label: "地图俯瞰", graph: "/Icon/Navi/map.svg", graph_hover: "/Icon/Navi/map-hover.svg", path: "/Map"}
])

const router = useRouter()
function goTo(path) {
    router.push(path)
}
</script>

<style scoped>
.menu{
    height: 70px;
    background-color: #F6F6F6;
    width: 100vw;
    min-width: 1080px;
    border-bottom: 1px solid #dcdcdc;
}

.menu-link{
    text-decoration: none;
    color: inherit;
}

.menu ul{
    float: left;
    height: 100%;
    width: 100vw;
    display: flex;

    justify-content: center;
}

.menu li{
    width: 150px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    
    font-size: 18px;
    cursor: pointer;
    list-style: none;
    text-align: center;
    align-items: center;
}

.menu ul li img{
    width: 40px;
}

.menu ul li:hover{
    color: #309fd9;
}

</style>