import { ref } from 'vue'
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { firebaseAuth } from '@/plugins/firebase'

export const useFirebaseAuth = () => {
  const user = ref<User | null>(null)

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    })
    try {
      await signInWithPopup(firebaseAuth, provider)
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
    logout
  }
}