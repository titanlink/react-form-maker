import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { InputProps } from "./definitions"

interface Props {
  form: UseFormReturn
  input: InputProps
}

export const CustomFormField = ({ form, input }: Props) => {
  return (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem className="shadow-lg">
          <FormLabel><b>{input.inputLabel}</b></FormLabel>
          <FormControl>
            <Input className="min-w-[180px] bg-white" placeholder={input.placeHolder} {...field} type={input.keyboardType}
            disabled={input.readOnly}/>
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


