import type { Payload, PayloadRequest } from 'payload'
import { seedLessonsMath } from './collections/math/seedLessonsMath'
import { seedSubjects } from './collections/seedSubjects'
import { seedTopics } from './collections/seedTopics'

export const seed = async ({
  payload,
  req: _req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  try {
    console.log('🚀 EGE Seed started...')

    await seedSubjects(payload)
    await seedTopics(payload)
    await seedLessonsMath(payload)
    // await seedPracticeQuestions(payload);

    console.log('🎉 Seed completed successfully!')
  } catch (error) {
    console.error('💥 Seed failed:', error)
    throw error
  }
}
