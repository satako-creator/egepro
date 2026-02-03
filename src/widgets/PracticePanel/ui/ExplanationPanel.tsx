import RichText from '@/shared/ui/RichText'

interface ExplanationPanelProps {
  explanation: any // RichText
}

export const ExplanationPanel = ({ explanation }: ExplanationPanelProps) => {
  if (!explanation) {
    return null
  }

  return (
    <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
      <h3 className="font-semibold text-foreground mb-2">Пояснение</h3>
      <RichText data={explanation} />
    </div>
  )
}
