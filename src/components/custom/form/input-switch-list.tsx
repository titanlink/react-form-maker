import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl } from '@/components/ui/form'
import { FieldProps, InputOption } from './definitions'
import { UseFormReturn } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'


interface Props {
  title?: string,
  input: FieldProps,
  form: UseFormReturn,
  onCheckedChange: (value : InputOption) => void
}

export const InputSwitchList = ({input, onCheckedChange, form , title}:Props) => {
  let lista = input?.listConfig?.list ?? [] as InputOption[]
  if (lista == undefined) lista = []


  const value: string[] = input.value
  const label = input.optionLabel ?? "name"
  const optionValue = input.optionValue ?? "id"
  const description = input.optionDescription ?? "description"
  return (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <Card className='grid grid-cols-1 bg-blue-200/10'>
          <CardHeader>
            <CardTitle className="text-base">{title ?? input.label}</CardTitle>
          </CardHeader>
          <CardContent>
            {lista.map((item, index) => ( 
              <FormItem key={index} className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2  shadow-sm h-12 bg-blue-100/20">
                <div className="space-y-0.5">
                  {/* <FormLabel>{item?.name}</FormLabel>
                  <FormDescription>{item.description}</FormDescription> */}
                  <FormMessage />
                </div>
                <FormControl>
                  <Switch checked={!!input.listConfig?.selectedList?.find((option) => option.id == item.id)} onCheckedChange={() => {/* onCheckedChange(item) */}} aria-disabled disabled={input.disabled}/>
                </FormControl>
              </FormItem>
            ))}
          </CardContent>
        </Card>
      )} 
    />
  )
}
