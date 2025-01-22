<script setup lang="ts">
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'
import GoogleLoginButton from '@/components/GoogleLoginButton.vue'
import { createUserProfile } from '@/api/create_user_profile'

const { handleGoogleLogin } = useFirebaseAuth()
const handleLogin = async () => {
  await handleGoogleLogin(() => createUserProfile())
}

</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">ようこそ</h1>
      <div class="button-container">
        <GoogleLoginButton :onClick="handleLogin" />
      </div>
      <p class="login-subtitle">アカウントにログインして始めましょう</p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 20px;
}

.login-card {
  background: #2a2a2a;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
  border: 1px solid #3a3a3a;
  position: relative;
  min-height: 300px;
}

.login-title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 8px;
  font-weight: 600;
}

.button-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 80px);
}

.login-subtitle {
  color: #9e9e9e;
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
}
</style> 