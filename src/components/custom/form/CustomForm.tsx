"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import { useForm, UseFormReturn } from "react-hook-form";


import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { ArrowLeft, Eye, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import inputErrors from "./input-errors";
import { TagsInput } from "@/components/ui/tags-input";
import { CustomFormProps, FieldProps, InputProps } from "./definitions";
import { CustomFormField } from "./input";
import { Separator } from "@/components/ui/separator";
import { CustomFormSwitch } from "./input-switch";
import { CustomFormSelect } from "./input-select";
import { CustomFormFieldOTP } from "./input-otp";
import { CustomFormFieldColor } from "./input-color";
import CustomFormDate from "./input-date";
import { InputSwitchList } from "./input-switch-list";


interface Props {
  formConfig: CustomFormProps
  children?: ReactNode;
}


export const CustomForm = ({formConfig, children}: Props) => {
  const [config, setConfig] = useState(formConfig)
  const [isPending, startTransition] = useTransition()
  // const config = formConfig
  const form = useForm<z.infer<typeof config.formSchema>>({
    resolver: zodResolver(config.formSchema),
    defaultValues: config.defaultValues,
  })
  const { errors, isSubmitting } = form.formState

  console.log("🚀 ~ CustomForm ~ form.formState: (errors)", errors)

  useEffect(() => {
    form.reset(config.defaultValues);
  }, [config.defaultValues, config.inputConfig]);

  useEffect(() => {
    setConfig(formConfig);
  }, [formConfig]);

  let columnas: number =  config.columns ?? 3;
  let gap: number =  config.gap ?? 2;


  const handleSubmit = async (data : any) =>{
    try{
      const isValid = config.formSchema.safeParse(data)
      console.log("🚀 ~ custom -> handleSubmit ~ data:", config.defaultValues)
      startTransition(async () => {
        config.onSubmit(data)
      })
    }catch (error) {
      console.error("Error al enviar el formulario:", error)
      toast.error("Ocurrió un error al enviar el formulario.")
    } finally {
      // form.reset()
      setTimeout(() => {
        form.resetField("id")
      }, 1000)
    }
  }

  const formClass = config.className ?? `grid grid-cols-${columnas} gap-${gap} pt-4`
  return (
    <div className="w-full ">
      {
        config.isFormChild && ( 
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {FormContent()}
          </form>
        </Form>
        )
      }
      {/* { (config.isFormChild ) && FormContent() } */}
    </div>
  )

  function FormContent() {
    return (
      <Card >
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">{config.formTitle}</h1>
          </CardTitle>
        </CardHeader>
        <div  className="space-y-4 px-2 py-4">
          <Separator />
          <div className={`${formClass}`}>
            {
              config.inputConfig.map((input, index) => (
                <div key={index}>
                  {getInputType(input, form, config)}
                </div>
              ))
            }
          </div>
          {children}
        </div>
        {!config.isFormChild && (
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {config.submitBtnLabel ?? "Guardando..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {config.submitBtnLabel ?? "Guardar"}
                </>
              )}
            </Button>
          </CardFooter>
        )}
        {config.isFormChild && (
          <CardFooter className="flex justify-end">
            <Button type="button" onClick={form.handleSubmit(handleSubmit)} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {config.submitBtnLabel ?? "Guardando..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {config.submitBtnLabel ?? "Guardar"}
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    )
  }
}

interface BuildFormConfigParams<T extends Record<string, any>> {
  formSchema: z.ZodObject<any>
  fieldsConfig: Array<FieldProps| FieldProps[]>
  entity?: T | null
  isFormChild?: boolean
  title?: string
  className?: string
}

export const buildFormConfig = <T extends Record<string, any>>({
  formSchema,
  fieldsConfig,
  entity,
  title,
  isFormChild = true,
  className = "grid grid-cols-3 gap-4"
}: BuildFormConfigParams<T>): CustomFormProps => {
  // console.log("🚀 ~ buildFormConfig ~ fieldsConfig:", fieldsConfig)
  const inputs = getInputConfig(fieldsConfig, entity);
  // console.log("🚀 ~ buildFormConfig ~ inputs:", inputs)
  const defaultValues = Object.fromEntries(inputs.map(({ name, initValue }) => [name, initValue]));
  const isNew = !entity?.id;
  
  if (!isNew) defaultValues["id"] = entity?.id;
  const formTitle =  `${isNew ? "Registrar" : "Editar"} ${title ?? 'Entidad'}`;
  const btnLabel = isNew ? "Registrar" : "Actualizar";
  return {
    formTitle: formTitle,
    inputConfig: inputs,
    submitBtnLabel: btnLabel,
    formSchema,
    defaultValues,
    isFormChild,
    className: className,
    onSubmit: async (values: any) => {
      console.warn("🚀 ~ DEFAULT SUBMIT ||| onSubmit -------> buildFormConfig ~ values:", values);
      if (!isNew) values["id"] = entity?.id;
      // await handleSubmit(values);
    },
  };
};

export function getInputType(input: InputProps, form: UseFormReturn, config: CustomFormProps): ReactNode {
  // if (input.inputType === InputTypes.SELECT && input.dependsOn) {
  //   return <DynamicFormSelect key={input.name} input={input} form={form} />
  // }
  

  switch (input.inputType) {
    case InputTypes.TEXT:
      return <CustomFormField key={input.name} input={input} form={form} />
    case InputTypes.SWITCH:
      return <CustomFormSwitch key={input.name} input={input} form={form} />
    case InputTypes.SELECT:
      return <CustomFormSelect key={input.name} input={input} form={form} />
    case InputTypes.OTP:
      return <CustomFormFieldOTP key={input.name} input={input} form={form} />
    case InputTypes.COLOR:
      return <CustomFormFieldColor key={input.name} input={input} form={form} />
    case InputTypes.DATE:
      return <CustomFormDate key={input.name} input={input} form={form}/>
    case InputTypes.SWITCH_LIST:
      return <InputSwitchList key={input.name} input={input} form={form} onCheckedChange={input?.listConfig?.onOptionChange ?? (() => {})}/>
      
    // case InputTypes.CHECK_LIST:
    //   return <InputCheckList key={input.name} input={input} onCheckedChange={input?.listConfig?.onOptionChange ?? (() => {})}/>
    // case InputTypes.NUMBER:
    //   return <CustomFieldNumber key={input.name} input={input} form={form} />
    // case InputTypes.FILE:
    //   return <CustomFormFile key={input.name} input={input} form={form} />
    // case InputTypes.HIDDEN:
    //   return <CustomFormFieldHidden key={input.name} input={input} form={form} />
    //   // return <input type="hidden" name={input.name} value={input.initValue} />
    // case InputTypes.FORM:
    //   const childSchema = config.formSchema.def.shape[input.name].def.innerType.def.element
    //   const fieldsConfig  = generateFieldsFromZod(childSchema)

    //   return <div>
    //     <pre> {JSON.stringify(input.initValue, null, 2)}</pre> 
    //   </div>


    default:
      return ( 
        <div> <pre>{JSON.stringify(input, null, 2)}</pre> </div>
      )
  }
}

export const getInputConfig = <T extends Record<string, any>>(
  fieldsConfig: Array<FieldProps | FieldProps[]>,
  data: T | undefined | null
): InputProps[] =>
  fieldsConfig.flatMap((fieldGroup) => {
    const fields = Array.isArray(fieldGroup) ? fieldGroup : [fieldGroup];

    return fields.map((field) => {
      const rawValue = data?.[field.name as keyof T];
      let initValue: any = "";

      initValue = typeof rawValue === "number" ? rawValue : rawValue ?? "";

      if (field.inputType == InputTypes.SELECT) {
        initValue = rawValue;
      }

      if (Array.isArray(rawValue) || field.inputType == InputTypes.SWITCH_LIST) {
        initValue = field?.listConfig?.selectedList;
      }

      return {
        ...field,
        inputLabel: field.label,
        initValue,
        readOnly: field.readOnly ?? false,
        hidden: field.hidden ?? false,
      };
    });
  });




export enum InputTypes {
  HIDDEN = "hidden",
  TEXT = "text",
  NUMBER = "number",
  SWITCH = "switch",
  SELECT = "select",
  CHECK_LIST = "checklist",
  SWITCH_LIST = "switchlist",
  DATE = "date",
  TEXTAREA = "textarea",
  FILE = "file",
  OTP = "otp",
  FORM = "form",
  COLOR = "color",
}

export enum TextInputType {
  DEFAULT = "default",
  NUMBER = "number",
  EMAIL = "email",
  PHONE = "phone",
  PASSWORD = "password",
}

export enum ButtonTypes {
  customBtnElevated = 0,
  customBtnOutlined = 1,
  customBtnText = 2,
}