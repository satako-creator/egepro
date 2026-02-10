import type { Block } from 'payload'
import { EquationPreview } from './EquationPreview'

export const EquationBlock: Block = {
  slug: 'equationBlock',
  interfaceName: 'EquationBlock',

  fields: [
    {
      name: 'formula',
      type: 'code',
      label: 'LaTeX Formula',
      required: true,
      admin: {
        language: 'markdown',
        editorOptions: {
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: {
            top: 16,
            bottom: 16,
          },
          lineNumbers: 'on',
        },
        components: {
          afterInput: ['/payload/blocks/Equation/EquationPreview#EquationPreview'],
        },
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Подпись (необязательно)',
    },
  ],
}
