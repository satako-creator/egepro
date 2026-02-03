'use server'

import { getMeUser } from '@/shared/utilities/getMeUser'

export async function getCurrentUser() {
  try {
    const { user } = await getMeUser()
    return user
  } catch {
    return null // Для неавторизованных
  }
}
