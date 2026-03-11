Для сидов тестов у тебя уже всё почти стандартизировано. Ниже минимальная «памятка», как добавлять новые тесты.

---

## 1. Файл с данными вопросов

Путь:  
`src/payload/endpoints/seed/data/practice/practice-questions-<topic>.json`

Например, для логарифмов:  
`practice-questions-logarithms.json`

Содержимое: массив объектов с метаданными (без текста задач):

```jsonc
[
  {
    "lessonSlug": "logarithms-definition-properties",
    "type": "single",
    "difficulty": "easy",
    "order": 1,
    "points": 1,
    "timeLimit": 0,
    "questionPreview": "Краткое описание вопроса",
    "tags": ["логарифмы", "определение"],
  },
]
```

Что важно:

- `lessonSlug` — slug урока, к которому привязан вопрос (сид найдет `lesson.id`).
- `type`, `difficulty`, `order`, `points`, `tags` — логика/сортировка.
- `questionPreview` — короткий текст для админки/таблиц.

---

## 2. Сидер для конкретной темы

Путь:  
`src/payload/endpoints/seed/collections/math/seedPracticeQuestions<Topic>.ts`

Пример:  
`seedPracticeQuestionsLogarithms.ts`

Что делает сидер:

1. Импортирует JSON с метаданными:

```ts
import questionsData from '../../data/practice/practice-questions-logarithms.json'
```

2. Для каждого элемента:

- ищет `lesson` по `lessonSlug`,
- собирает `question`, `options`, `hint`, `explanation` через хелперы:

```ts
import { createParagraph, createRichText, createEquationBlockNode } from '../../helpers/helpers'
```

3. Создаёт/обновляет документ в коллекции `practice-questions`:

```ts
await payload.create({ collection: 'practice-questions', data })
```

или `update`, если уже есть.

Ты можешь копировать готовый `seedPracticeQuestionsLogarithms.ts` как шаблон, меняя:

- путь к JSON,
- название функции `seedPracticeQuestions<NewTopic>`,
- наполнение `question` / `options` / `explanation` внутри цикла.

---

## 3. Подключение сидера в корневой seed

Файл:  
`src/payload/endpoints/seed/index.ts`

1. Импортируешь новый сидер:

```ts
import { seedPracticeQuestionsLogarithms } from './collections/math/seedPracticeQuestionsLogarithms'
```

2. Добавляешь вызов в общий pipeline:

```ts
await seedSubjects(payload)
await seedTopics(payload)
await seedLessonsMath(payload)

await seedPracticeQuestionsLogarithms(payload)
// позже: await seedPracticeQuestionsQuadratic(payload)
```

Порядок важен: сначала сидятся уроки (`lessons`), потом уже вопросы (`practice-questions`), потому что сидер вопросов ищет `lesson.id` по `lessonSlug`.

---

## 4. Рабочий цикл

1. Добавляешь/правишь JSON в `data/practice/...`.
2. Корректируешь сидер `seedPracticeQuestions<...>.ts` (тексты, формулы, варианты).
3. Убеждаешься, что сидер импортирован и вызывается в `seed/index.ts`.
4. Запускаешь эндпоинт `seed` → вопросы обновляются/создаются.
