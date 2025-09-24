import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { FieldProps } from "./definitions"

interface Props {
  form: UseFormReturn
  input: FieldProps
}

export const CustomFormFieldHidden = ({ form, input }: Props) => {
  return (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem >
          {/* <FormLabel>{input.label}</FormLabel> */}
          <FormControl>
            <Input className="min-w-[180px] bg-white" placeholder={input.placeHolder} {...field} type={input.inputType}
            disabled={input.disabled}/>
          </FormControl>
          {input.description && <FormDescription>{input.description}</FormDescription>}
          <FormMessage />
          {/* <pre> {JSON.stringify(field, null, 2)}</pre> */}
        </FormItem>
      )}
    />
  )
}


