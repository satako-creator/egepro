import type { CollectionBeforeValidateHook } from 'payload'

function extractPlainTextFromLexical(doc: any): string {
  if (!doc?.root?.children) return ''

  const walk = (nodes: any[]): string => {
    let result = ''
    for (const node of nodes) {
      if (!node) continue

      if (typeof node.text === 'string') {
        result += node.text + ' '
      }

      if (Array.isArray(node.children) && node.children.length > 0) {
        result += walk(node.children)
      }
    }
    return result
  }

  return walk(doc.root.children).trim().replace(/\s+/g, ' ')
}

export const generateQuestionPreview: CollectionBeforeValidateHook = ({ data }) => {
  if (!data) return data

  if (data.question && !data.questionPreview) {
    const plain = extractPlainTextFromLexical(data.question)
    data.questionPreview = plain.slice(0, 80)
  }

  return data
}
