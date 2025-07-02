<template>
  <SearchBar />
  <div class="home-container">
    <p class="intro">
      欢迎使用软件学院导航系统~
    </p>

    <div class="circle-container">
      <div class="image-track">
        <!-- 第一组图片 -->
        <div
          v-for="image in Images"
          :key="image"
          class="image-wrapper"
        >
          <img
            class="circle-img"
            :src="image"
          >
        </div>
        <!-- 第二组重复图片（实现无缝循环） -->
        <div
          v-for="image in Images"
          :key="image+'-copy'"
          class="image-wrapper"
        >
          <img
            class="circle-img"
            :src="image"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue'

const Images = [
    '/Resources/activity-room-1.jpg',
    '/Resources/activity-room-2.jpg',
    '/Resources/advice-corner.jpg',
    '/Resources/note-board.jpg',
    '/Resources/study.jpg',
    '/Resources/elevator.jpg',
    '/Resources/420.jpg',
    '/Resources/408-board.jpg',
    '/Resources/lobby-1.jpg',
    '/Resources/lobby-2.jpg',
    '/Resources/playroom-2.jpg',
    '/Resources/center-lobby-1.jpg',
    '/Resources/center-lobby-2.jpg',
    '/Resources/center-lobby-3.jpg',
    '/Resources/center-lobby-4.jpg',
    '/Resources/center-lobby-5.jpg',
    '/Resources/balcony-whole.jpg',
]

</script>

<style scoped>
.home-container {
    min-width: 1080px;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.intro {
    font-size: 24px;
    font-weight: 600;
}

.circle-container {
    width: 100%;
    height: 400px;
    position: relative;
    margin-top: 100px;
}

.image-track {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    gap: 20px;
    animation: slide 30s linear infinite;
    will-change: transform;
}

.image-wrapper {
    position: relative;
    flex-shrink: 0;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    z-index: 1;
    transform-origin: center center;
}

.image-wrapper:hover {
    transform: scale(1.1);
    z-index: 10;
}

.circle-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@keyframes slide {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
</style>