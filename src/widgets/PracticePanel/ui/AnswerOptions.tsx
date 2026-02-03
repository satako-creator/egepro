import RichText from '@/shared/ui/RichText'

interface Option {
  id: string
  text: any // RichText
  isCorrect?: boolean | null
}

interface AnswerOptionsProps {
  options:
    | Array<{
        id?: string | null
        text: any // RichText
        isCorrect?: boolean | null
      }>
    | null
    | undefined
  selectedAnswers: string[]
  isMultiple: boolean
  onAnswerSelect: (optionId: string) => void
}

export const AnswerOptions = ({
  options = [],
  selectedAnswers,
  isMultiple,
  onAnswerSelect,
}: AnswerOptionsProps) => {
  // Фильтруем опции, чтобы убрать те, у которых нет id
  const validOptions = (options || []).filter(
    (opt): opt is Required<typeof opt> => opt.id != null && typeof opt.id === 'string',
  ) as Option[]

  const isSelected = (optionId: string) => selectedAnswers.includes(optionId)

  return (
    <div className="space-y-3 mb-6">
      {validOptions.map((option) => {
        const selected = isSelected(option.id)
        const inputType = isMultiple ? 'checkbox' : 'radio'

        return (
          <label
            key={option.id}
            className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
              selected ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/50'
            }`}
          >
            <input
              type={inputType}
              checked={selected}
              onChange={() => onAnswerSelect(option.id)}
              className="mt-1 mr-3"
            />
            <div className="flex-1">
              <RichText data={option.text} />
            </div>
          </label>
        )
      })}
    </div>
  )
}
