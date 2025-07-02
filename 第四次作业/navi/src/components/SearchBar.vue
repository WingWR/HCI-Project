<template>
  <div class="container">
    <div class="search-wrapper">
      <input 
        ref="searchInput" 
        v-model="input"
        class="search-bar" 
        :class="{ hover: isInputHovered }" 
        type="text" 
        placeholder="请输入房间或教师名"
        @keyup.enter="submitSearch"
        @mouseenter="onInputEnter"
        @mouseleave="onInputLeave" 
        @focus="showSuggestions = true" 
        @blur="onInputBlur"
      >

      <button 
        class="search-btn" 
        :class="{ hover: isBtnHovered }"
        @click="submitSearch"
        @mouseenter="onBtnEnter"
        @mouseleave="onBtnLeave"
      >
        <img
          class="search-icon"
          src="/Icon/Home/search.svg"
        >
      </button>

      <!-- 搜索建议下拉框 -->
      <div
        v-show="showSuggestions && (suggestions.length > 0 || searchHistory.length > 0)"
        class="suggestions-box"
      >
        <div
          v-if="input.length === 0"
          class="history-section"
        >
          <div class="suggestion-header">
            最近搜索
          </div>
          <div 
            v-for="(item, index) in searchHistory" 
            :key="'history-'+index"
            class="suggestion-item"
            @mousedown="selectHistory(item)"
          >
            {{ item }}
            <span
              class="remove-history"
              @click.stop="removeHistory(index)"
            >×</span>
          </div>
        </div>
        <div v-else>
          <div 
            v-for="(item, index) in suggestions" 
            :key="index"
            class="suggestion-item"
            @mousedown="selectSuggestion(item)"
          >
            {{ item.displayName || item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { pagerooms, pageteachers } from '@/utils/data'
import { getGroupIdByRoomId } from '@/utils/data'

// 安全读取 localStorage 的函数
function getLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  try {
    return stored ? JSON.parse(stored) : defaultValue
  } catch (e) {
    console.error(`解析 localStorage[${key}] 失败`, e)
    return defaultValue
  }
}

const router = useRouter()

// 搜索输入和状态
const input = ref('')
const showSuggestions = ref(false)

// 搜索历史（安全读取）
const searchHistory = ref(getLocalStorage('searchHistory', []))

// 房间和教师数据（直接从 data.js 获取）
const allRooms = ref(pagerooms)
const allTeachers = ref(pageteachers)

// 计算搜索建议
const suggestions = computed(() => {
  const searchText = input.value.trim().toLowerCase()
  if (!searchText) return []

  // 1. 搜索教师
  const teacherMatches = allTeachers.value
    .filter(teacher => teacher.name.toLowerCase().includes(searchText))
    .map(teacher => ({
      ...teacher,
      type: 'teacher',
      displayName: `${teacher.name} (教师)`
    }))

  // 2. 搜索房间
  const roomMatches = allRooms.value
    .filter(room => room.name.toLowerCase().includes(searchText))
    .map(room => ({
      ...room,
      type: 'room',
      displayName: `${room.name} (房间)`
    }))

  // 3. 按匹配度排序
  return [...teacherMatches, ...roomMatches]
    .sort((a, b) => {
      // 开头匹配的排在前面
      const aStarts = a.name.toLowerCase().startsWith(searchText)
      const bStarts = b.name.toLowerCase().startsWith(searchText)
      if (aStarts !== bStarts) return aStarts ? -1 : 1
      
      // 短匹配排在前面
      return a.name.length - b.name.length
    })
    .slice(0, 8) // 限制显示数量
})

// 添加搜索历史
function addToHistory(searchText) {
    // 移除重复项
    searchHistory.value = searchHistory.value.filter(item => item !== searchText)
    // 添加到开头
    searchHistory.value.unshift(searchText)
    // 限制历史记录数量
    if (searchHistory.value.length > 5) {
        searchHistory.value = searchHistory.value.slice(0, 5)
    }
    // 保存到本地存储
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

// 移除搜索历史
function removeHistory(index) {
    searchHistory.value.splice(index, 1)
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

// 选择历史记录
function selectHistory(item) {
    input.value = item
    submitSearch()
}

// 选择建议项
function selectSuggestion(item) {
  if (item.type === 'teacher') {
    // 教师跳转到对应房间
    router.push({
      name: 'RoomDetail',
      params: {
        groupId: item.groupId,
        roomId: item.roomId
      }
    })
  } else if (item.type === 'room') {
    // 房间直接跳转
    router.push({
      name: 'RoomDetail',
      params: {
        groupId: item.groupId,
        roomId: item.id
      }
    })
  }
  input.value = item.name
  showSuggestions.value = false
}


// 提交搜索
function submitSearch() {
  const query = input.value.trim()
  if (!query) {
    showSuggestions.value = true
    return
  }

  addToHistory(query)
  emit('search', query)

  // 根据类型跳转
  const matchedRoom = allRooms.value.find(r => r?.name === query)
  const matchedTeacher = allTeachers.value.find(t => t?.name === query)

   if (matchedRoom) {
    const roomId = matchedRoom.id // 直接使用数字ID
    const groupId = matchedRoom.groupId || getGroupIdByRoomId(roomId)
    if (groupId) {
      router.push({ name: 'RoomDetail', params: { groupId, roomId } })
    }
  } else if (matchedTeacher) {
    const roomId = matchedTeacher.roomId
    const groupId = getGroupIdByRoomId(roomId)
    if (groupId) {
      router.push({ name: 'RoomDetail', params: { groupId, roomId } })
    }
  } else {
    alert('未找到相关结果')
  }

  showSuggestions.value = false
}


// 输入框失去焦点处理
function onInputBlur() {
    // 延迟隐藏以确保点击建议项能触发
    setTimeout(() => {
        showSuggestions.value = false
    }, 200)
}

// 其他原有方法
const emit = defineEmits(['search'])

const isInputHovered = ref(false)
const isBtnHovered = ref(false)

function onInputEnter() {
    isInputHovered.value = true
    isBtnHovered.value = true
}

function onInputLeave() {
    isInputHovered.value = false
    isBtnHovered.value = false
}

function onBtnEnter() {
    isBtnHovered.value = true
}

function onBtnLeave() {
    isBtnHovered.value = false
}
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.search-bar {
    width: 50vw;
    height: 30px;
    border-radius: 32px;
    font-size: 15px;
    padding-left: 18px;
    border: 1px solid #ccc;
    outline: none;
    transition: border-color 0.3s ease;
}

.search-bar:focus {
    border-color: #409eff; /* 聚焦时边框高亮 */
}

.search-icon {
    width: 25px;
    height: 25px;
}

.search-btn {
    width: 27px;
    height: 27px;
    transform: translateX(-40px);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
}

.hover {
    background-color: rgb(241, 241, 241);
}

/* 搜索建议框样式 */
.suggestions-box {
    position: absolute;
    top: 100%;
    left: 0;
    width: 50vw;
    max-height: 300px;
    overflow-y: auto;
    background: white;
    border: 1px solid #ddd;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
}

.suggestion-header {
    padding: 8px 16px;
    font-weight: bold;
    color: #666;
    border-bottom: 1px solid #eee;
    background-color: #f8f8f8;
}

.suggestion-item {
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
  border-left: 3px solid transparent;
  color: #333;
  font-size: 14px; 
}

.suggestion-item:hover {
    background-color: #f5f5f5;
    border-left-color: #409eff;
}

.suggestion-item.highlight {
    background-color: #ebf5ff;
}

.remove-history {
    color: #999;
    font-size: 18px;
    padding: 0 5px;
    transition: color 0.2s;
}

.remove-history:hover {
    color: #f00;
}

.history-section {
    padding-bottom: 8px;
}

/* 滚动条样式 */
.suggestions-box::-webkit-scrollbar {
    width: 6px;
}

.suggestions-box::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.suggestions-box::-webkit-scrollbar-track {
    background: transparent;
}
</style>