import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { FieldProps } from "./definitions"


interface Props {
  form: UseFormReturn
  input: FieldProps
  className?: string
}

export const CustomFormField = ({ form, input, className }: Props) => {
  return (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel><b>{input.label}</b></FormLabel>
          <FormControl className="shadow-lg">
            <Input className="min-w-[180px]" placeholder={input.placeHolder} {...field} type={input.keyboardType}
            disabled={input.disabled}/>
          </FormControl>
          {input.description && <FormDescription>
            {/* <TextType 
              text={input.description}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter=""
            /> */}
            {input.description}
            </FormDescription>}
          <FormMessage />
          {/* <pre> {JSON.stringify(field, null, 2)}</pre> */}
        </FormItem>
      )}
    />
  )
}


