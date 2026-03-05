import { getSubjects } from '@/entities/subject/api/getSubjects'

export default async function Page() {
  const subjects = await getSubjects()
  return (
    <div className="container">
      <h1>Предметы</h1>
    </div>
  )
}
