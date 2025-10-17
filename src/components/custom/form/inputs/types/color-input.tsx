"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { BaseInput } from "../base"
import { JSX } from "react"
import React from "react"
import { ColorPicker, IColor, useColor } from "react-color-palette"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
import { cn } from "@/lib/utils"


export class ColorInput extends BaseInput {
  render(): JSX.Element {
    const { input, form } = this;
    return (
      <FormField
        control={form.control}
        name={input.name}
        render={({ field }) => (
          <FormItem >
            <FormLabel>{input.label}</FormLabel>
            <FormControl>
              <ColorField
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
}


export interface ColorInputProps {
  value?: string
  onChange?: (color: string) => void
  onBlur?: () => void
  disabled?: boolean
  className?: string
  placeholder?: string
}

const ColorField = React.forwardRef<HTMLButtonElement, ColorInputProps>(
  ({ value = "#000000", onChange, onBlur, disabled, className }, ref) => {
    const [color, setColor] = useColor(value)
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
      if (value !== color.hex) {
        setColor({ ...color, hex: value })
      }
    }, [color, setColor, value])

    const handleColorChange = (newColor: IColor) => {
      setColor(newColor)
      onChange?.(newColor.hex)
    }

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen)
      if (!newOpen) {
        onBlur?.()
      }
    }

    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground", className)}
          >
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded border border-border" style={{ backgroundColor: color.hex }} />
              <span>{color.hex}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <ColorPicker color={color} onChange={handleColorChange} hideInput={["rgb", "hsv"]} />
        </PopoverContent>
      </Popover>
    )
  },
)

ColorField.displayName = "ColorInput"



