'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getSubjectTree() {
  const payload = await getPayload({ config: configPromise })

  // 1. Получаем все данные параллельно для скорости
  const [subjectsRes, topicsRes, lessonsRes] = await Promise.all([
    payload.find({ collection: 'subjects', limit: 100 }),
    payload.find({ collection: 'topics', limit: 1000, sort: 'order' }),
    payload.find({ collection: 'lessons', limit: 1000, sort: 'order' }),
  ])

  const subjects = subjectsRes.docs
  const topics = topicsRes.docs
  const lessons = lessonsRes.docs

  // 2. Собираем иерархию: Subject -> Topics -> Lessons
  return subjects.map((subject) => {
    const subjectTopics = topics
      .filter((t) => {
        const sId = typeof t.subject === 'object' ? t.subject.id : t.subject
        return sId === subject.id
      })
      .map((topic) => {
        const topicLessons = lessons.filter((l) => {
          const tId = typeof l.topic === 'object' ? l.topic.id : l.topic
          return tId === topic.id
        })
        return { ...topic, lessons: topicLessons }
      })

    return { ...subject, topics: subjectTopics }
  })
}
