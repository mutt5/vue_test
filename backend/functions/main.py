# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply create your functions and deploy with `firebase deploy`

from firebase_functions import https_fn, identity_fn
from firebase_functions.identity_fn import AuthBlockingEvent, BeforeSignInResponse
from firebase_admin import initialize_app, firestore

# アプリの初期化
initialize_app()

# Firestoreクライアントの初期化
db = firestore.client()

@https_fn.on_call(region="asia-northeast1")
def create_user_profile(req: https_fn.CallableRequest) -> dict | None:
    """
    初回サインイン時にFirestoreを確認し、
    まだユーザープロファイルが存在しなければ作成する。
    """
    uid = req.auth.uid
    name = req.auth.token.get("name", "")
    email = req.auth.token.get("email", "")
    user_doc_ref = db.collection('users').document(uid)
    
    print(f"サインインイベント発生: UID = {uid}")
    
    if not user_doc_ref.get().exists:
        print(f"新規ユーザーを検出: {email}")
        # Firestoreにユーザーデータを保存
        user_data = {
            'uid': uid,
            'email': email,
            'displayName': name,
            'createdAt': firestore.SERVER_TIMESTAMP,
            'updatedAt': firestore.SERVER_TIMESTAMP
        }
        user_doc_ref.set(user_data)
        print(f"ユーザープロファイルを作成: {user_data}")
    else:
        print(f"既存ユーザーのサインイン: {uid}")
    
    # 今回はユーザー情報を上書き・ブロックしないので None を返す
    return None


@https_fn.on_call(region="asia-northeast1")
def get_user_profile(req: https_fn.CallableRequest) -> dict:
    """
    ユーザープロファイルを取得するエンドポイント
    """
    # リクエストデータからuidを取得
    uid = req.data.get('uid')
    if not uid:
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INVALID_ARGUMENT,
            message='User ID is required'
        )
    
    try:
        # ユーザードキュメントの取得
        user_doc = db.collection('users').document(uid).get()
        if not user_doc.exists:
            raise https_fn.HttpsError(
                code=https_fn.FunctionsErrorCode.NOT_FOUND,
                message='User not found'
            )
        
        # ユーザーデータを返す
        return user_doc.to_dict()
        
    except Exception as e:
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=str(e)
        )
