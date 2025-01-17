# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply create your functions and deploy with `firebase deploy`

from firebase_functions import https_fn, identity_fn
from firebase_functions.identity_fn import AuthBlockingEvent, BeforeSignInResponse
from firebase_admin import initialize_app, firestore

# アプリの初期化
initialize_app()

# Firestoreクライアントの初期化
db = firestore.client()

@identity_fn.before_user_created(region="asia-northeast1")
def create_user_profile(event: AuthBlockingEvent) -> BeforeSignInResponse | None:
    """
    初回サインイン前にFirestoreを確認し、
    まだユーザープロファイルが存在しなければ作成する。
    """
    user = event.data
    user_doc_ref = db.collection('users').document(user.uid)
    
    print(f"サインインイベント発生: UID = {user.uid}")
    
    if not user_doc_ref.get().exists:
        print(f"新規ユーザーを検出: {user.email}")
        # Firestoreにユーザーデータを保存
        user_data = {
            'uid': user.uid,
            'email': user.email,
            'displayName': user.display_name,
            'createdAt': firestore.SERVER_TIMESTAMP,
            'updatedAt': firestore.SERVER_TIMESTAMP
        }
        user_doc_ref.set(user_data)
        print(f"ユーザープロファイルを作成: {user_data}")
    else:
        print(f"既存ユーザーのサインイン: {user.email}")
    
    # 今回はユーザー情報を上書き・ブロックしないので None を返す
    return None


@https_fn.on_request(region="asia-northeast1")
def get_user_profile(req: https_fn.Request) -> https_fn.Response:
    """
    ユーザープロファイルを取得するエンドポイント
    """
    # GETメソッドのみ許可
    if req.method != 'GET':
        return https_fn.Response(
            status=405,
            response={'error': 'Method not allowed'}
        )
    
    # クエリパラメータからuidを取得
    uid = req.args.get('uid')
    if not uid:
        return https_fn.Response(
            status=400,
            response={'error': 'User ID is required'}
        )
    
    try:
        # ユーザードキュメントの取得
        user_doc = db.collection('users').document(uid).get()
        if not user_doc.exists:
            return https_fn.Response(
                status=404,
                response={'error': 'User not found'}
            )
        
        # ユーザーデータを返す
        return https_fn.Response(
            response=user_doc.to_dict(),
            headers={'Content-Type': 'application/json'}
        )
        
    except Exception as e:
        return https_fn.Response(
            status=500,
            response={'error': str(e)}
        )
