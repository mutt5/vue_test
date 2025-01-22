import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseFunctions = getFunctions(firebaseApp, 'asia-northeast1')

const functions = getFunctions(firebaseApp, 'asia-northeast1');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callFunction = async <Response, Request extends Record<string, any> = Record<string, any>>(
    functionName: string,
    request: Request = {} as Request,
) => {
    const func = httpsCallable<Request, Response>(functions, functionName);
    try {
        const result = await func(request);
        return result.data;
    }
    catch (error) {
        console.error(`Error calling function ${functionName}:`, error);
        throw error;
    }

    
}

export const callCloudFunction = callFunction;