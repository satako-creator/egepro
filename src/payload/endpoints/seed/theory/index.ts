import {
  createHeading,
  createParagraph,
  createRichText,
  type LexicalRichText,
} from '../helpers/helpers'
import { exponentialFunctionTheory } from './math/exponentialFunctionTheory'
import { logarithmsTheory } from './math/logarithmsTheory'
import { nthRootBasicsTheory } from './math/nthRootBasicsTheory'
import { powerGeneralizationTheory } from './math/powerGeneralizationTheory'
import { createHeading, createParagraph, createRichText } from '../helpers/helpers'

type LessonKey = string

const MATH_THEORY: Record<LessonKey, () => LexicalRichText> = {
  'exponential-function-basics': exponentialFunctionTheory,
  'logarithms-definition-properties': logarithmsTheory,
  'power-generalization': powerGeneralizationTheory,
  'nth-root-basics': nthRootBasicsTheory,
}

export const getLessonTheory = (slug: string): LexicalRichText => {
  const builder = MATH_THEORY[slug]
  if (builder) return builder()

  return createRichText([
    createHeading('h2', 'Теория в разработке'),
    createParagraph('Теоретический материал для этого урока будет добавлен позже.'),
  ])
}
