<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'
import LoginPage from '@/pages/LoginPage.vue'
import TheNavigation from './components/TheNavigation.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

const loading = ref(true)
const { user, initAuth, logout } = useFirebaseAuth()

onMounted(() => {
  initAuth(() => {
    loading.value = false
  })
})
</script>

<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <LoginPage v-if="!user" />
    <template v-else>
      <TheNavigation :on-logout="logout" />
      <div class="app-container">
        <RouterView />
      </div>
    </template>
  </template>
</template>

<style scoped>
.app-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
</style>