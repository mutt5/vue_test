<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{
  onLogout: () => void
}>()

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="nav-wrapper">
    <nav class="nav-container">
      <button class="hamburger" @click="toggleMenu" aria-label="メニュー">
        <span :class="{ 'hamburger-line': true, open: isOpen }" />
        <span :class="{ 'hamburger-line': true, open: isOpen }" />
        <span :class="{ 'hamburger-line': true, open: isOpen }" />
      </button>

      <div class="overlay" v-if="isOpen" @click="isOpen = false"></div>
      <div :class="{ 'nav-menu': true, open: isOpen }">
        <RouterLink to="/" @click="isOpen = false">Home</RouterLink>
        <RouterLink to="/about" @click="isOpen = false">About</RouterLink>
        <a href="#" @click.prevent="onLogout">ログアウト</a>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* ナビゲーションの高さを確保するラッパー */
.nav-wrapper {
  height: 4rem; /* 固定の高さ */
}

.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* より高い値に設定 */
  padding: 1rem;
  height: 4rem;
  background-color: var(--color-background);
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative; /* 追加 */
  z-index: 1002; /* nav-containerの中で最前面 */
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  transition: all 0.3s ease-in-out;
}

.hamburger-line.open:nth-child(1) {
  transform: translateY(11px) rotate(45deg);
}

.hamburger-line.open:nth-child(2) {
  opacity: 0;
}

.hamburger-line.open:nth-child(3) {
  transform: translateY(-11px) rotate(-45deg);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000; /* nav-containerと同じ */
}

.nav-menu {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100vh;
  background-color: var(--color-background);
  padding: 60px 20px;
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1001; /* オーバーレイより上、ハンバーガーより下 */
}

.nav-menu.open {
  left: 0;
}

.nav-menu a {
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0.5rem 0;
}

.nav-menu a:hover {
  color: var(--color-heading);
}

.nav-menu a.router-link-exact-active {
  color: var(--color-heading);
}
</style> 