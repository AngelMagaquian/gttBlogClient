import { Label } from "@/components/ui/label"

export const ErrorLabel = ({id, error}: LabelErrorProps) => {
  return (
    <Label htmlFor={id} className="text-sm text-red-600 text-opacity-60">{error}</Label>
  )
}
