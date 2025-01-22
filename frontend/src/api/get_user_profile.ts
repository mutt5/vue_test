import { callCloudFunction } from '@/plugins/firebase';
import type { UserProfile } from '@/types/userProfile';
export interface GetUserProfileRequest {
  uid: string;
}

export const getUserProfile = async (request: GetUserProfileRequest): Promise<UserProfile> => {
  return await callCloudFunction<UserProfile>('get_user_profile', request);
};

export type GetUserProfile = typeof getUserProfile;

// モック関数
export const mockGetUserProfile = async (request: GetUserProfileRequest): Promise<UserProfile> => {
  return {
    uid: request.uid,
    email: 'mock@example.com',
    displayName: 'Mock User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
