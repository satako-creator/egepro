**ПРОМТ:**

У меня есть проект на Payload CMS с кастомным seed‑эндпоинтом. Ниже — текущая структура и примеры файлов. Нужно сгенерировать ВСЕ файлы/фрагменты кода, необходимые для добавления НОВОГО урока по математике (с указанной теорией) в сид‑процедуру: запись в `lessons-math.json`, файл теории в `theory/math`, регистрацию в `theory/index.ts`. Формат — готовые к копипасте файлы/патчи.

Текущая структура сидов:

```text
src/payload/endpoints/seed/
  index.ts
  collections/
    seedSubjects.ts
    seedTopics.ts
    math/
      seedLessonsMath.ts
  data/
    subjects.json
    topics.json
    lessons/
      lessons-math.json
  helpers/
    helpers.ts
  theory/
    index.ts
    math/
      exponentialFunctionTheory.ts
      logarithmsTheory.ts
```

Файл `src/payload/endpoints/seed/index.ts`:

```ts
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
```

Файл `src/payload/endpoints/seed/collections/math/seedLessonsMath.ts`:

```ts
import type { Payload } from 'payload'
import lessonsData from '../../data/lessons/lessons-math.json'
import { getLessonTheory } from '../../theory'

type LessonSeedItem = {
  title: string
  slug: string
  subjectSlug: string
  topicSlug: string
  grade: '7' | '8' | '9' | '10' | '11'
  order?: number
  summary?: string
  tags?: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
  estimatedTime?: number
  isEnabled?: boolean
}

export const seedLessonsMath = async (payload: Payload): Promise<void> => {
  console.log('🌱 Seeding lessons (math + russian)...')

  for (const rawLesson of lessonsData as LessonSeedItem[]) {
    const subjectRes = await payload.find({
      collection: 'subjects',
      where: { slug: { equals: rawLesson.subjectSlug } },
      limit: 1,
    })
    const subject = subjectRes.docs[0]
    if (!subject?.id) {
      console.warn(
        `⚠️ Subject not found for lesson "${rawLesson.title}" (subjectSlug: ${rawLesson.subjectSlug})`,
      )
      continue
    }

    const topicRes = await payload.find({
      collection: 'topics',
      where: { slug: { equals: rawLesson.topicSlug } },
      limit: 1,
    })
    const topic = topicRes.docs[0]
    if (!topic?.id) {
      console.warn(
        `⚠️ Topic not found for lesson "${rawLesson.title}" (topicSlug: ${rawLesson.topicSlug})`,
      )
      continue
    }

    const theory = getLessonTheory(rawLesson.slug)

    const data = {
      title: rawLesson.title,
      slug: rawLesson.slug,
      subject: subject.id,
      topic: topic.id,
      grade: rawLesson.grade,
      order: rawLesson.order ?? 0,
      summary: rawLesson.summary,
      theory,
      tags: rawLesson.tags?.map((tag) => ({ tag })) ?? [],
      difficulty: rawLesson.difficulty ?? 'medium',
      estimatedTime: rawLesson.estimatedTime ?? null,
      isEnabled: rawLesson.isEnabled ?? true,
    }

    const existing = await payload.find({
      collection: 'lessons',
      where: { slug: { equals: rawLesson.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'lessons',
        id: existing.docs[0].id,
        data,
      })
      console.log(`✅ Урок обновлён: ${rawLesson.title}`)
    } else {
      await payload.create({
        collection: 'lessons',
        data,
      })
      console.log(`✅ Урок создан: ${rawLesson.title}`)
    }
  }

  console.log('✅ Lessons (math + russian) seeding done')
}
```

Файл `src/payload/endpoints/seed/helpers/helpers.ts` содержит:

- `export interface LexicalNode { ... }`
- `export type LexicalRichText = { root: { ...; children: LexicalNode[] } }`
- функции: `createText`, `createParagraph`, `createHeading`, `createList`, `createRichText`
- и **правильный** Equation‑block helper:

```ts
export const createEquationBlockNode = (formula: string, caption?: string): LexicalNode => ({
  type: 'block',
  version: 2,
  format: '',
  fields: {
    blockType: 'equationBlock',
    formula,
    ...(caption ? { caption } : {}),
  },
})
```

Файл `src/payload/endpoints/seed/theory/index.ts` сейчас устроен так (пример, можно слегка менять, но суть такая):

```ts
import type { LexicalRichText } from '../helpers/helpers'
import { exponentialFunctionTheory } from './math/exponentialFunctionTheory'
import { logarithmsTheory } from './math/logarithmsTheory'

// slug урока → функция генерации LexicalRichText
type LessonKey = string

const MATH_THEORY: Record<LessonKey, () => LexicalRichText> = {
  'exponential-function-basics': exponentialFunctionTheory,
  'logarithms-definition-properties': logarithmsTheory,
}

export const getLessonTheory = (slug: string): LexicalRichText => {
  const builder = MATH_THEORY[slug]
  if (builder) return builder()

  // fallback на случай, если теорию ещё не написали
  const { createHeading, createParagraph, createRichText } = require('../helpers/helpers')
  return createRichText([
    createHeading('h2', 'Теория в разработке'),
    createParagraph('Теоретический материал для этого урока будет добавлен позже.'),
  ])
}
```

Файлы теории:  
`src/payload/endpoints/seed/theory/math/exponentialFunctionTheory.ts`  
`src/payload/endpoints/seed/theory/math/logarithmsTheory.ts`  
уже реализованы по шаблону:

```ts
import {
  createHeading,
  createParagraph,
  createList,
  createRichText,
  createEquationBlockNode,
} from '../../helpers/helpers'
import type { LexicalRichText } from '../../helpers/helpers'

export const exponentialFunctionTheory = (): LexicalRichText => {
  // ...
}
```

---

### Задача

1. Я дам тебе **текст теории** для НОВОГО урока по математике (с формулами), а также:
   - `slug` урока,
   - `subjectSlug` (всегда `"math"`),
   - `topicSlug` (например `"algebra"` или `"logarithms"`),
   - `grade`, краткое `summary`, список тегов.

2. На основе этого сгенерируй:

**(А)** Новый элемент для файла  
`src/payload/endpoints/seed/data/lessons/lessons-math.json`  
в формате:

```jsonc
{
  "title": "НАЗВАНИЕ УРОКА",
  "slug": "lesson-slug",
  "subjectSlug": "math",
  "topicSlug": "topic-slug",
  "grade": "10",
  "order": 7,
  "summary": "Краткое описание для списка уроков.",
  "tags": ["ЕГЭ", "математика", "..."],
  "difficulty": "medium",
  "estimatedTime": 30,
  "isEnabled": true,
}
```

**(Б)** Новый файл теории в `src/payload/endpoints/seed/theory/math/` вида:

- имя файла: `<slug>Theory.ts`, например `exponentialFunctionTheory.ts` или `logarithmsTheory.ts` (ты должен предложить корректное имя по slug).
- экспорт по шаблону:

```ts
import {
  createHeading,
  createParagraph,
  createList,
  createRichText,
  createEquationBlockNode,
} from '../../helpers/helpers'
import type { LexicalRichText } from '../../helpers/helpers'

export const <CamelCaseName>Theory = (): LexicalRichText =>
  createRichText([
    // здесь разложенная по структуре теория:
    // заголовки h2/h3, абзацы, createList, ВСЕ формулы только через createEquationBlockNode(...)
  ])
```

Важно:

- Все математические формулы оформляй как строки LaTeX, передаваемые в `createEquationBlockNode(formula, caption?)`.
- Внутри строк правильно экранируй слеши: `\` → `\\`.
- Текст теории нужно нарезать: разделы → `createHeading('h2', ...)`, подпункты → `createHeading('h3', ...)`, пояснения → `createParagraph`, списки → `createList`, формулы → `createEquationBlockNode`.

**(В)** Обновление `src/payload/endpoints/seed/theory/index.ts`:

- Добавь импорт нового файла теории.
- Добавь строку в `MATH_THEORY`:

```ts
'<lesson-slug>': <CamelCaseName>Theory,
```

(Я ожидаю итоговый фрагмент файла `index.ts` с уже добавленным кейсом.)

---

### Входные данные для генерации (пример)

Я дам такой блок:

- slug урока: `exponential-equations-advanced`
- subjectSlug: `math`
- topicSlug: `algebra`
- grade: `"11"`
- order: `8`
- summary: `"Решение сложных показательных уравнений, в том числе сводимых к квадратным и с параметрами."`
- tags: `["ЕГЭ", "алгебра", "показательные уравнения"]`
- difficulty: `"hard"`
- estimatedTime: `40`

Текст теории (markdown/обычный текст с формулами вида `a^x`, `\\log_a b` и т.п.):

```text
... ТЕОРИЯ ...
```

---

### Что я хочу получить в ответ

1. Готовый JSON‑объект, который можно вставить в `lessons-math.json` (только этот объект, без оборачивающих `[]`, я сам вставлю как элемент массива).
2. Полный содержимое файла `src/payload/endpoints/seed/theory/math/<slug>Theory.ts`.
3. Патч/фрагмент для `src/payload/endpoints/seed/theory/index.ts` с:
   - новым импортом,
   - обновлённым объектом `MATH_THEORY`.

Формат ответа: три отдельных блока кода (`// 1. lessons-math.json`, `// 2. <slug>Theory.ts`, `// 3. theory/index.ts (фрагмент)`), без лишнего текста.

---

Используй этот промт на основе моего текущего кода и структуры и сгенерируй файлы для урока по логарифмам на основе следующей теории: (далее я вставлю текст теории по логарифмам).
