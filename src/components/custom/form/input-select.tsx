"use client"
import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { InputOption, InputProps } from "./definitions"
// import { CustomCard } from "../CustomCard"

interface Props {
  form: UseFormReturn
  input: InputProps
}

export const CustomFormSelect = ({ form, input }: Props) => {
  let lista = input?.listConfig?.list ?? [] as InputOption[]
  if (lista == undefined) lista = []

  const initValue: string = input.initValue ?? ""
  const label = input.optionLabel ?? "name"
  const optionValue = input?.listConfig?.optionValue ?? input.optionValue ?? "id"
  const description = input.optionDescription ?? "description"


  const getValue = (item: InputOption) => {
    if (optionValue == "name") return item[optionValue]
    return item.id
  }

  return (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg bg-blue-100/20">
          <div className="space-y-0.5 pr-5">
            <FormLabel><b>{input.inputLabel}</b></FormLabel>
            {/* <label>items: {lista.length}</label> */}
            {input.description && <FormDescription>{input.description}</FormDescription>}
            <FormMessage />
          </div>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={initValue.toString()} value={field.value?.toString() ?? initValue.toString()}>
              <FormControl>
                <SelectTrigger className="w-[60%] bg-black/10 dark:bg-white/25">
                  <SelectValue placeholder={input.placeHolder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {lista.map((item) => (
                  <SelectItem value={ getValue(item).toString()} key={item.id}>
                  {item.name}
                </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {/* <pre><b>{JSON.stringify(field.value, null, 2) } </b> </pre> */}
        </FormItem>
      )}
      />
  )
}

