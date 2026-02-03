export function extractPlainTextFromLexical(doc: any): string {
  if (!doc?.root?.children) return ''

  const texts: string[] = []

  const traverse = (node: any) => {
    if (!node) return
    if (typeof node.text === 'string') {
      texts.push(node.text)
    }
    if (Array.isArray(node.children)) {
      node.children.forEach(traverse)
    }
  }

  doc.root.children.forEach(traverse)

  return texts.join(' ').trim().replace(/\s+/g, ' ')
}
