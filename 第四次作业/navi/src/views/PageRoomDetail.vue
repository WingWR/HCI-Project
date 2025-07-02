<template>
  <div
    v-if="room"
    class="room-detail"
  >
    <h2 class="title">
      {{ room.name }}
    </h2>
    <hr>
    <div class="desc">
      <img
        class="desc-img"
        :src="room.img"
      >
      <div
        v-if="room.teachers && room.teachers.length > 0"
        class="teacher-desc"
      >
        <ul>
          <p class="teacher-intro">
            办公室教师名单
          </p>
          <hr>
          <li
            v-for="teacher in room.teachers"
            :key="teacher.name"
            class="teacher-name"
          >
            👩‍🏫 {{ teacher.name }}
          </li>
        </ul>
        <img
          :src="room.board_img"
          class="board-img"
        >
        <button
          class="back-btn"
          @click="goBack"
        >
          返回
        </button>
      </div>
    </div>
  </div>

  <div v-else>
    房间信息加载中... 或者房间不存在。
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { allRoomsData } from '@/utils/data'

const router = useRouter()

const props = defineProps({
  groupId: {
    type: [Number, String],
    required: false
  },
  roomId: {
    type: [Number, String],
    required: false
  }
})

const room = computed(() => {
  // 优先使用 simpleRoomId（如果提供）
  const targetRoomId = props.simpleRoomId || Number(props.roomId)
  const targetGroupId = Number(props.groupId)
  
  if (!targetRoomId) return null
  
  // 如果有明确groupId，直接查找
  if (targetGroupId) {
    const group = allRoomsData.find(g => g.id === targetGroupId)
    return group?.rooms?.find(r => r.id === targetRoomId) || null
  }
  
  // 如果没有groupId，全局搜索房间
  for (const group of allRoomsData) {
    const found = group.rooms?.find(r => r.id === targetRoomId)
    if (found) return found
  }
  
  return null
})

function goBack() {
  router.back()
}
</script>

<style scoped>
hr {
  size: 2px;
  width: 100%;
}

.room-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
}

.title{
  font-size: 24px;
  font-weight: 300px;
  font-family: "Microsoft YaHei";

  margin-bottom: 0px;
}

.desc{
  display: flex;
  flex-direction: row;
}

.desc-img{
  width: 50%;
  max-height: 1500px;
  margin-top: 30px;

  border-radius: 60px;
}

.board-img{
  border-radius: 30px;
  margin-top: 32px;
  width: 40%;
}

.teacher-intro{
  font-size: 32px;
  font-weight: 600;

  margin-bottom: 0;
}

.teacher-name{ 
  margin-left: 24px;
  font-size: 30px;
}

.back-btn {
  margin-top: 20px;
  margin-left: 36px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>
