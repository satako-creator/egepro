// // entities/lesson/api/actions.ts
// 'use server'

// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { revalidatePath } from 'next/cache'
// import { UnauthorizedError } from 'payload'

// export async function markLessonAsCompleted(lessonId: number) {
//   const payload = await getPayload({ config: configPromise })

//   // Проверяем авторизацию
//   const user = await payload.auth()
//   if (!user) {
//     throw new UnauthorizedError()
//   }

//   // Обновляем прогресс пользователя
//   await payload.update({
//     collection: 'users',
//     id: user.id,
//     data: {
//       // Здесь может быть логика обновления прогресса
//       // Например, добавить в массив пройденных уроков
//     },
//   })

//   // Начисляем XP
//   await payload.update({
//     collection: 'users',
//     id: user.id,
//     data: {
//       xp: { $inc: 50 }, // +50 XP за урок
//       level: { $inc: 0 }, // Уровень автоматически обновится через хук
//     },
//   })

//   revalidatePath('/profile')
//   revalidatePath(`/lessons/${lessonId}`)
// }

// export async function getLessonProgress(userId: number, lessonId: number) {
//   const payload = await getPayload({ config: configPromise })

//   // Здесь может быть логика получения прогресса по уроку
//   // Например, проверка, был ли урок пройден, сколько попыток и т.д.

//   return {
//     isCompleted: false,
//     attempts: 0,
//     bestScore: 0,
//   }
// }
