<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'
import { getUserProfile } from '@/api/get_user_profile'
import type { UserProfile } from '@/types/userProfile'

const { getCurrentUser } = useFirebaseAuth()
const userProfile = ref<UserProfile | null>(null)

const fetchUserProfile = async () => {
  const user = getCurrentUser()
  if (user?.uid) {
    try {
      userProfile.value = await getUserProfile({ uid: user.uid })
      console.log(`userProfile: ${userProfile.value}`)
    } catch (error) {
      console.error('ユーザープロフィール取得エラー:', error)
    }
  }
}

onMounted(() => {
  console.log(`user mounted: ${getCurrentUser()?.uid}`)
  fetchUserProfile()
})
</script>

<template>
  <div class="about">
    <div v-if="userProfile" class="profile-container">
      <h1>プロフィール情報</h1>
      <div class="profile-info">
        <p><span class="label">表示名:</span> {{ userProfile.displayName }}</p>
        <p><span class="label">メール:</span> {{ userProfile.email }}</p>
        <p><span class="label">作成日:</span> {{ new Date(userProfile.createdAt).toLocaleDateString('ja-JP') }}</p>
        <p><span class="label">更新日:</span> {{ new Date(userProfile.updatedAt).toLocaleDateString('ja-JP') }}</p>
      </div>
    </div>
    <div v-else class="loading">
      読み込み中...
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.profile-container {
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.profile-container h1 {
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-align: center;
}

.profile-info {
  color: #ffffff;
}

.profile-info p {
  margin: 0.8rem 0;
}

.label {
  font-weight: bold;
  color: #9e9e9e;
  margin-right: 0.5rem;
}

.loading {
  color: #9e9e9e;
  font-size: 1.2rem;
}
</style>
