// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '../views/PageHome.vue'
import PageMap from '../views/PageMap.vue'
import PageRooms from '../views/PageRooms.vue'
import PageTeachers from '../views/PageTeachers.vue'
import PageRoomDetail from '../views/PageRoomDetail.vue'

const routes = [
  { path: '/', component: PageHome },
  { path: '/Map', component: PageMap },
  { path: '/Rooms', component: PageRooms },
  { path: '/Teachers', component: PageTeachers },

  // 主路由格式：/Rooms/groupId/roomId
  {
    path: '/Rooms/:groupId(\\d+)/:roomId(\\d+)',
    name: 'RoomDetail',
    component: PageRoomDetail,
    props: route => ({
      groupId: Number(route.params.groupId),
      roomId: Number(route.params.roomId)
    })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router