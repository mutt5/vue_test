import { ref } from 'vue'
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { firebaseAuth } from '@/plugins/firebase'
import type { UserProfile } from '@/types/userProfile'

export const useFirebaseAuth = () => {
  // このuserは必要ないかも
  const user = ref<User | null>(null)
  const handleGoogleLogin = async (create_user_profile: () => Promise<UserProfile | null>) => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    })
    try {
      const result = await signInWithPopup(firebaseAuth, provider)
      console.log(`result: ${result}`)
      // user.value = result.user
      try {
        await create_user_profile()
      } catch (error) {
        await firebaseAuth.signOut()
        console.error('ユーザー作成エラー:', error)
      }
    } catch (error) {
      console.error('ログインエラー:', error)
    }
  }

  const initAuth = (onAuthStateReady: () => void) => {
    onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      console.log('firebaseUser', firebaseUser)
      user.value = firebaseUser
      onAuthStateReady()
    })
  }

  const logout = async () => {
    try {
      await firebaseAuth.signOut()
    } catch (error) {
      console.error('ログアウトエラー:', error)
    }
  }

  return {
    user,
    handleGoogleLogin,
    initAuth,
    logout,
  }
}