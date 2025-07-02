<template>
  <div class="teacher-list">
    <div
      v-for="group in groupedTeachers"
      :key="group.letter"
      class="teacher-group"
    >
      <h2 class="letter">
        {{ group.letter }}
      </h2>
      <hr>
      <ul>
        <li
          v-for="teacher in group.teachers"
          :key="teacher.id"
          @click="gotoRoomDetail(teacher.groupId, teacher.roomId)"
        >
          <button class="teacher-btn">
            {{ teacher.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { allRoomsData } from '@/utils/data'
import pinyin from 'pinyin'

const router = useRouter()

// 从allRoomsData提取所有教师
const allTeachers = computed(() => {
  const teachers = []
  
  allRoomsData.forEach(group => {
    group.rooms?.forEach(room => {
      if (room.teachers) {
        room.teachers.forEach(teacher => {
          teachers.push({
            ...teacher,
            groupId: group.id,
            roomId: room.id
          })
        })
      }
    })
  })
  
  return teachers
})

// 获取拼音首字母
function getPinyinFirstLetter(str) {
  if (!str || typeof str !== 'string') return ''
  const pinyinArray = pinyin(str, {
    style: pinyin.STYLE_NORMAL,
    heteronym: false,
  })
  return pinyinArray[0]?.[0]?.charAt(0)?.toUpperCase() || ''
}

// 按字母分组
const groupedTeachers = computed(() => {
  const groupsMap = {}
  
  allTeachers.value.forEach(teacher => {
    const letter = getPinyinFirstLetter(teacher.name)
    if (!groupsMap[letter]) {
      groupsMap[letter] = []
    }
    groupsMap[letter].push(teacher)
  })
  
  // 转换为数组并排序
  return Object.entries(groupsMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([letter, teachers]) => ({
      letter,
      teachers: teachers.sort((a, b) => a.name.localeCompare(b.name, 'zh'))
    }))
})

function gotoRoomDetail(groupId, roomId) {
  router.push(`/Rooms/${groupId}/${roomId}`)
}
</script>

<style scoped>
hr {
  size: 2px;
  width: 40vw;
}

.teacher-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
}

.teacher-group {
  display: flex;
  flex-direction: column;
}

.letter{
  font-size: 18px;
  font-weight: 300px;
  font-family: "Microsoft YaHei";

  margin-bottom: 0px;
}

.teacher-group ul {
  list-style: none;
  padding: 0;

  display: grid;
  grid-template-columns: repeat(4,100px);
  grid-gap: 20px;

}

.teacher-group li {
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 4px;
}

.teacher-btn{
  width: 100px;
  height: 80px;
  border-width: 1px;
  border-radius: 12px;

  font-size: 20px;
  cursor: pointer;
}

.teacher-btn:hover{
  background-color: rgba(211, 211, 211, 0.924);
}
</style>