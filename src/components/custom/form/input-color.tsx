"use client"
import type {  UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ColorCnInput } from "@/components/ui/color-input"
import { FieldProps } from "./inputs/base"


interface Props {
  form: UseFormReturn
  input: FieldProps
}

export function CustomFormFieldColor({ form, input }: Props) {
  return (
    <FormField
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem >
          <FormLabel>{input.label}</FormLabel>
          <FormControl>
            <ColorCnInput
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={input.disabled}
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
