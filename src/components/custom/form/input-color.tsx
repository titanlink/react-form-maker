"use client"
import type { Control, FieldPath, FieldValues, UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ColorInput } from "@/components/ui/color-input"
import { InputProps } from "./definitions"

interface Props {
  form: UseFormReturn
  input: InputProps
}

export function CustomFormFieldColor({ form, input }: Props) {
  return (
    <FormField
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem >
          <FormLabel>{input.inputLabel}</FormLabel>
          <FormControl>
            <ColorInput
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={input.readOnly}
              placeholder={input.placeHolder}
            />
          </FormControl>
          <FormDescription>{input.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
