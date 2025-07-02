<template>
  <div class="page-container">
    <div class="map-wrapper">
      <div 
        class="map-container" 
        v-html="processedSvg" 
        @click="handleRoomClick"
        @mouseover="handleRoomHover"
        @mousemove="updateTooltipPosition"
        @mouseout="handleRoomMouseOut"
      ></div>
    </div>
    <div 
      v-show="currentRoomInfo" 
      class="details-container"
      :style="tooltipStyle"
    >
      <div class="details-header">
        <h2>房间信息</h2>
      </div>
      <div class="details-content">
        <div class="info-item">
          <label>房间编号：</label>
          <span>{{ currentRoomInfo?.id }}</span>
        </div>
        <div class="info-item">
          <label>房间类型：</label>
          <span>{{ getRoomType(currentRoomInfo?.id) }}</span>
        </div>
        <div class="info-item">
          <label>人员信息：</label>
          <div class="personnel-list">
            <div v-for="person in getRoomPersonnel(currentRoomInfo?.id)" :key="person.id" class="person-item">
              {{ person.name }} - {{ person.role }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { allRoomsData } from '@/utils/data'

const router = useRouter()
const processedSvg = ref('')
const currentRoomInfo = ref(null)
const mousePosition = ref({ x: 0, y: 0 })

const tooltipStyle = computed(() => ({
  position: 'fixed',
  left: `${mousePosition.value.x + 20}px`,
  top: `${mousePosition.value.y}px`,
  transform: 'none'
}))

function updateTooltipPosition(event) {
  // 获取视窗大小
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // 获取提示框的大小（预估值，实际值需要在DOM渲染后才能获取）
  const tooltipWidth = 300
  const tooltipHeight = 200
  
  // 计算位置，确保提示框不会超出视窗
  let x = event.clientX + 20
  let y = event.clientY
  
  // 如果提示框会超出右边界，则显示在鼠标左侧
  if (x + tooltipWidth > viewportWidth) {
    x = event.clientX - tooltipWidth - 20
  }
  
  // 如果提示框会超出下边界，则向上偏移
  if (y + tooltipHeight > viewportHeight) {
    y = viewportHeight - tooltipHeight - 10
  }
  
  mousePosition.value = { x, y }
}

// 处理SVG添加交互样式
function processSvg(svgContent) {
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml')
  
  const elements = svgDoc.querySelectorAll('path, rect')
  
  elements.forEach(el => {
    const label = el.getAttribute('inkscape:label') || el.id
    
    if (label && label.includes('-')) {
      el.setAttribute('class', (el.getAttribute('class') || '') + ' room-area')
      el.setAttribute('data-room-id', label)
      const currentStyle = el.getAttribute('style') || ''
      el.setAttribute('style', currentStyle + ';cursor:pointer;')
    }
  })
  
  return svgDoc.documentElement.outerHTML
}

// 获取房间类型和信息
function getRoomInfo(roomId) {
  if (!roomId) return null
  const [groupId, roomNum] = roomId.split('-').map(Number)
  const group = allRoomsData.find(g => g.id === groupId)
  if (!group) return null
  return group.rooms.find(r => r.id === roomNum)
}

// 获取房间类型
function getRoomType(roomId) {
  if (!roomId) return '未知'
  const [groupId] = roomId.split('-').map(Number)
  const group = allRoomsData.find(g => g.id === groupId)
  return group?.name || '未知'
}

// 获取房间人员信息
function getRoomPersonnel(roomId) {
  const roomInfo = getRoomInfo(roomId)
  return roomInfo?.teachers || []
}

// 处理房间点击 - 跳转到详情页
function handleRoomClick(event) {
  const roomElement = findRoomElement(event.target)
  if (!roomElement) return
  
  const roomId = roomElement.getAttribute('data-room-id')
  if (!roomId) return
  
  // 跳转到房间详情页
  const [groupId, id] = roomId.split('-')
  router.push(`/Rooms/${groupId}/${id}`)
}

// 处理房间悬停
function handleRoomHover(event) {
  const roomElement = findRoomElement(event.target)
  if (!roomElement) return
  
  const roomId = roomElement.getAttribute('data-room-id')
  if (!roomId) return
  
  // 更新房间信息
  currentRoomInfo.value = {
    id: roomId
  }
}

// 处理鼠标移出
function handleRoomMouseOut() {
  currentRoomInfo.value = null
}

// 查找房间元素
function findRoomElement(element) {
  while (element && !element.classList.contains('room-area')) {
    element = element.parentElement
  }
  return element
}

// 加载SVG
onMounted(async () => {
  try {
    const response = await fetch('/Resources/Map-interactive.svg')
    const svgText = await response.text()
    processedSvg.value = processSvg(svgText)
  } catch (error) {
    console.error('加载SVG失败:', error)
  }
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f5f5f5;
  position: relative;
  font-size: 16px;
  color: #333;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.map-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 40px);
  position: relative;
  overflow: auto;
}

.map-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-width: 200px;
  min-height: 200px;
  position: relative;
}

.map-container :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
}

.details-container {
  position: fixed;
  right: 20px;
  top: 20px;
  width: 300px;
  max-width: calc(100vw - 40px);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-size: 14px;
  border: 1px solid #e8e8e8;
  pointer-events: none;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.details-header h2 {
  margin: 0;
  font-size: 20px;
  color: #1a1a1a;
  font-weight: 600;
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  line-height: 1.5;
}

.info-item label {
  color: #666;
  min-width: 80px;
  font-weight: 500;
  font-size: 14px;
}

.info-item span {
  color: #262626;
  font-size: 14px;
  flex: 1;
}

.personnel-list {
  flex: 1;
}

.person-item {
  padding: 8px;
  background: #fafafa;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #262626;
}

.person-item:last-child {
  margin-bottom: 0;
}

.map-container :deep(.room-area) {
  transition: all 0.2s ease;
}

.map-container :deep(.room-area:hover) {
  opacity: 0.7;
  filter: drop-shadow(0 0 2px rgba(0, 0, 255, 0.5));
}

@media (max-width: 1200px) {
  .map-container {
    max-width: 60%;
  }
  
  .details-container {
    width: 35%;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 10px;
  }
  
  .map-wrapper {
    height: calc(100vh - 20px);
  }
  
  .map-container {
    padding: 10px;
  }
  
  .details-container {
    max-width: calc(100vw - 20px);
  }
}
</style>