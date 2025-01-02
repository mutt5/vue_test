<script setup lang="ts">
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'

const { handleGoogleLogin } = useFirebaseAuth()
</script>

<template>
  <div class="login-container">
    <h1>ログイン</h1>
    <button @click="handleGoogleLogin" class="google-login-btn">
      Googleでログイン
    </button>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.google-login-btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.google-login-btn:hover {
  background-color: #357abd;
}
</style> 