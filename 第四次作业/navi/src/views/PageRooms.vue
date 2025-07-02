<template>
  <div class="room-directory">
    <div
      v-for="group in groups" 
      :key="group.id" 
      class="group"
    >
      <h3 class="group-name">
        {{ group.name }}
      </h3>
      <hr>
      <div class="room-scroll">
        <div
          v-for="room in group.rooms" 
          :key="room.id" 
          class="room-card" 
          @click="gotoRoomDetail(group.id, room.id)"
        >
          <img
            :src="room.img"
            :class="room.img == '/Resources/balcony-whole.jpg'? 'special-img' : 'room-img'"
          >
          <div class="room-desc">
            <img
              class="pos-img"
              src="/Icon/Rooms/pos.svg"
            >
            <div class="room-name">
              {{ room.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { allRoomsData } from '@/utils/data'  // 导入共享数据

const router = useRouter()
const groups = ref(allRoomsData)  // 直接使用导入的数据

function gotoRoomDetail(groupID, roomID) {
  router.push(`/Rooms/${groupID}/${roomID}`)
}
</script>

<style scoped>
.room-directory {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;

  overflow-y: auto;
  overflow-x: hidden;
}

.group {
  min-width: 1080px;
  max-width: 1080px;
  border-color: gray;

  display: flex;
  flex-direction: column;
}

.group-name {
  font-size: 20px;
  margin-bottom: 0px;
}

hr {
  size: 2px;
  width: 100%;
}

.room-scroll {
  margin-top: 20px;
  margin-left: 5px;

  display: flex;
  gap: 20px;
  overflow-x: auto;
  white-space: nowrap;
}

.room-card {
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  cursor: pointer;
}

.room-img {
  max-width: 200px;
  border-radius: 30px;
}
.room-img:hover{
  border-radius: 30px;
  transform: scale(1.05)
}

.special-img{
  width: 400px;
  min-height: 150px;
  border-radius: 30px;
  margin-left: 200px;
}
.special-img:hover{
  border-radius: 30px;
  transform: scale(1.05);
}

.room-desc{
  display: flex;
  flex-direction: row;
  
  position: relative;
  margin-top: 5px;
  left: -25%;
}

.pos-img{
  width: 20px;
}

.room-name {
  font-size: 12px;
  font-weight: 500;
  font-family: "Miceosoft YaHei";
}
.room-name:hover{
  color: #309fd9;
}
</style>