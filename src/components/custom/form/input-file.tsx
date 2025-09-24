'use client'
import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FieldProps } from "./definitions";

interface Props {
  form: UseFormReturn
  input: FieldProps
}

export const CustomFormFile = ({ form, input }: Props) => {
  const [preview, setPreview] = useState<string | null>(form.getValues(input.name) ?? null)
  const [showPreview, setShowPreview] = useState<boolean>(input.fileConfig?.showPreview ?? false)
  
  const accept = input.fileConfig?.accept || "*/*";
  const multiple = input.fileConfig?.multiple || false;
  const maxSize = input.fileConfig?.maxSize || 25;
  const previewSize = input.fileConfig?.previewSize || 60;

  useEffect(() => {
    setPreview(form.getValues(input.name) || null)
  }, [input])


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      console.log("🚀 ~ handleFileChange ~ objectUrl:", objectUrl)
    } else {
      setPreview(null)
    }
  }

  return (
    <>
    
    <FormField
      key={input.name}
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel><b>{input.label}</b></FormLabel>
          <div className="flex gap-1">
            <FormControl>
              <Input 
                type="file"
                accept={accept}
                multiple={multiple}
                placeholder={input.placeHolder}
                name={field.name}
                disabled={input.disabled}
                onChange={(e) => {field.onChange(e.target.files?.[0]); handleFileChange(e)}} 
              />
            </FormControl>
            { preview && (<Button type="button" onClick={() => { setShowPreview(!showPreview); }}>
              {showPreview ? <EyeOff /> : <Eye />}
            </Button>) }
            <FormDescription>{input.description}</FormDescription>
          </div>
          {/* <pre> <b>{JSON.stringify(field, null, 2) } </b> </pre> */}
          <FormMessage />
          {
            (preview && showPreview) && (
            <Card>
              <Image
                src={preview}
                alt="Preview"
                width={previewSize}
                height={previewSize}
                />
            </Card> ) 
          }
        </FormItem>
      )}
    />
    </>
  )
}

