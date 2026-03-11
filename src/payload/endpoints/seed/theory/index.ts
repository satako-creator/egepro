import type { LexicalRichText } from '../helpers/helpers'
import { exponentialFunctionTheory } from './math/exponentialFunctionTheory'
import { logarithmsTheory } from './math/logarithmsTheory'
import { powerGeneralizationTheory } from './math/powerGeneralizationTheory'

type LessonKey = string

const MATH_THEORY: Record<LessonKey, () => LexicalRichText> = {
  'exponential-function-basics': exponentialFunctionTheory,
  'logarithms-definition-properties': logarithmsTheory,
  'power-generalization': powerGeneralizationTheory,
}

export const getLessonTheory = (slug: string): LexicalRichText => {
  const builder = MATH_THEORY[slug]
  if (builder) return builder()

  const { createHeading, createParagraph, createRichText } = require('../helpers/helpers')
  return createRichText([
    createHeading('h2', 'Теория в разработке'),
    createParagraph('Теоретический материал для этого урока будет добавлен позже.'),
  ])
}
