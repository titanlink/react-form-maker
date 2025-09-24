import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Switch } from "../../ui/switch"
import { InputProps } from "./definitions"

interface Props {
  form: UseFormReturn
  input: InputProps
}

export const CustomFormSwitch = ({ form, input }: Props) => {
  return (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2  shadow-lg h-12 bg-blue-100/20">
          <div className="space-y-0.5">
            <FormLabel><b>{input.inputLabel}</b></FormLabel>
            <FormDescription>{input.placeHolder ?? input.description}</FormDescription>
            <FormMessage />
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} aria-readonly  disabled={input.readOnly}/>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

