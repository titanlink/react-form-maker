"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormField } from "@/components/ui/form"
import { BaseInput } from "../base"
import { JSX } from "react"


export class DateInput extends BaseInput {
  render(): JSX.Element {
    const { input, form } = this;
    return (
      <FormField
        key={input.name}
        control={form.control}
        name={input.name}
        render={({ field }) => {
          // 🔑 Inicializa el estado con el valor actual del formulario (si existe)
          const [date, setDate] = React.useState<Date | undefined>(
            field.value ? new Date(field.value) : undefined
          )

          // 🔑 Sincroniza el estado con el form cuando cambie
          React.useEffect(() => {
            if (field.value && !date) {
              setDate(new Date(field.value))
            }
          }, [field.value])

          const handleSelect = (selectedDate?: Date) => {
            setDate(selectedDate)
            field.onChange(selectedDate) // <-- Actualiza el form
          }

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )
        }}
      />
    )
  }
}


