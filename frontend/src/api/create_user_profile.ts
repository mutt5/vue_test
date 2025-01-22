import { callCloudFunction } from '@/plugins/firebase';
import type { UserProfile } from '@/types/userProfile';

export const createUserProfile = async (): Promise<UserProfile | null> => {
  return await callCloudFunction<UserProfile | null>('create_user_profile', {});
};

export type CreateUserProfile = typeof createUserProfile;

// モック関数
export const mockCreateUserProfile = async (): Promise<UserProfile | null> => {
  return {
    uid: 'mock-uid',
    email: 'mock@example.com',
    displayName: 'New Mock User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
