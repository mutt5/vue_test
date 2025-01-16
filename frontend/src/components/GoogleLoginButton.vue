<script setup lang="ts">
defineProps<{
  onClick: () => void
}>()
</script>

<template>
  <button @click="onClick" class="google-login-btn">
    <div class="button-content">
      <img src="https://www.google.com/favicon.ico" alt="Google Logo" class="google-logo" />
      <span>Googleでログイン</span>
    </div>
  </button>
</template>

<style scoped>
.google-login-btn {
  display: flex;
  justify-content: center;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #333333;
  color: #ffffff;
  border: 1px solid #444444;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.google-login-btn:hover {
  background-color: #444444;
  border-color: #555555;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.google-logo {
  width: 20px;
  height: 20px;
  filter: brightness(1.2);
}
</style> 