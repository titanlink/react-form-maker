// "use client"

// import { Form } from "@/components/ui/form";
// import { z } from "zod"
// import type { ZodObject, ZodTypeAny } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { toast } from "sonner";
// import { useForm, UseFormReturn } from "react-hook-form";



// import { ReactNode, useEffect, useMemo, useState, useTransition } from "react";
// import { Loader2, Save } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { CustomFormField } from "./input";
// import { Separator } from "@/components/ui/separator";
// import { CustomFormSwitch } from "./input-switch";
// import { CustomFormSelect } from "./input-select";
// import { CustomFormFieldOTP } from "./input-otp";
// import { InputSwitchList } from "./input-switch-list";
// import { InputCheckList } from "./input-check-list";
// import { CustomFieldNumber } from "./input-number";
// import { CustomFormFile } from "./input-file";
// import { CustomFormFieldHidden } from "./input-hidden";
// import { CustomFormTextarea } from "./input-textarea";
// import { CustomFormDate } from "./input-date";
// import { FormErrors } from "./form-errors";
// import { CustomFormFieldColor } from "./input-color";
// import { AccordionGroupedSwitches } from "./accordion-grouped-switches";
// import { CustomFormProps, FieldProps, GroupedOption, InputOption } from "./inputs/base";


// interface Props {
//   formConfig: CustomFormProps
//   children?: ReactNode;
//   isActive?: boolean
//   className?: string
// }


// export const CustomForm = ({formConfig, children, isActive, className}: Props) => {
//   const [config, setConfig] = useState(formConfig)
//   const [isPending, startTransition] = useTransition()
//   // const config = formConfig


//   const schema = getDynamicSchema(config.inputConfig)
//   const form = useForm<z.infer<typeof config.formSchema>>({
//     resolver: useMemo(() => zodResolver(formConfig.formSchema), [formConfig.fieldsConfig]),
//     defaultValues: config.defaultValues,
//   })


//   useEffect(() => {
//     form.reset(config.defaultValues);
//   }, [config.defaultValues, config.inputConfig]);

//   useEffect(() => {
//     setConfig(formConfig);
//   }, [formConfig]);

//   const columnas: number =  config.columns ?? 3;
//   const gap: number =  config.gap ?? 2;


//   const handleSubmit = async (data : any) =>{
//     try{
//       const isValid = config.formSchema.safeParse(data)
//       startTransition(async () => {
//         config.onSubmit(data)
//       })
//     }catch (error) {
//       toast.error("Ocurrió un error al enviar el formulario.")
//     }
//   }

//   const formClass = config.className ?? `grid grid-cols-${columnas} gap-${gap} pt-4`
//   return (
//     <div className="w-full ">
//       <FormErrors formState={form.formState} />
//       {
//         config.isFormChild && ( 
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(handleSubmit)}>
//             {FormContent()}
//           </form>
//         </Form>
//         )
//       }
//     </div>
//   )

//   function FormContent() {
//     return (
//       <div className={className}> 
//         <CardHeader>
//           <CardTitle>
//             <h1 className="text-3xl">{config.formTitle}</h1>
//           </CardTitle>
//         </CardHeader>
//         <div  className="space-y-4 px-2 py-4">
//           <Separator />
//           <div className={`${formClass}`}>
//             {
//               config.inputConfig.map((input, index) => (
//                 <div key={index}>
//                   {getInputType(input, form, config)}
//                 </div>
//               ))
//             }
//           </div>
//           {children}
//         </div>
//         {!config.isFormChild && (
//           <CardFooter className="flex justify-end">
//             <Button type="submit" disabled={isPending}>
//               {isPending ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   {config.submitBtnLabel ?? "Guardando..."}
//                 </>
//               ) : (
//                 <>
//                   <Save className="h-4 w-4 mr-2" />
//                   {config.submitBtnLabel ?? "Guardar"}
//                 </>
//               )}
//             </Button>
//           </CardFooter>
//         )}
//         {config.isFormChild && (
//           <CardFooter className="flex justify-end">
//             <Button type="button" onClick={form.handleSubmit(handleSubmit)} disabled={isPending}>
//               {isPending ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   {config.submitBtnLabel ?? "Guardando..."}
//                 </>
//               ) : (
//                 <>
//                   <Save className="h-4 w-4 mr-2" />
//                   {config.submitBtnLabel ?? "Guardar"}
//                 </>
//               )}
//             </Button>
//           </CardFooter>
//         )}
//       </div>
//     )
//   }
// }

// interface BuildFormConfigParams<T extends Record<string, any>> {
//   formSchema?: z.ZodObject<any>
//   fieldsConfig: Array<FieldProps| FieldProps[]>
//   entity?: T | null
//   isFormChild?: boolean
//   title?: string
//   className?: string
// }

// export const buildFormConfig = <T extends Record<string, any>>({
//   formSchema,
//   fieldsConfig,
//   entity,
//   title,
//   isFormChild = true,
//   className = "grid grid-cols-3 gap-4"
// }: BuildFormConfigParams<T>): CustomFormProps => {
//   const inputs = getInputConfig(fieldsConfig, entity);
//   const defaultValues = Object.fromEntries(inputs.map(({ name, value }) => [name, value]));
//   const isNew = !entity?.id;
  
//   if (!isNew) defaultValues["id"] = entity?.id;
//   const formTitle =  `${isNew ? "Registrar" : "Editar"} ${title ?? 'Entidad'}`;
//   const btnLabel = isNew ? "Registrar" : "Actualizar";
//   const dynamicSchema =   getDynamicSchema(fieldsConfig)
//   return {
//     formTitle: formTitle,
//     inputConfig: inputs,
//     fieldsConfig: fieldsConfig,
//     submitBtnLabel: btnLabel,
//     formSchema: formSchema ?? dynamicSchema,
//     defaultValues,
//     isFormChild,
//     className: className,
//     onSubmit: async (values: any) => {
//       console.warn("🚀 ~ DEFAULT SUBMIT ||| onSubmit -------> buildFormConfig ~ values:", values);
//       if (!isNew) values["id"] = entity?.id;
//       // await handleSubmit(values);
//     },
//   };
// };




// export function getInputType(input: FieldProps, form: UseFormReturn, config: CustomFormProps): ReactNode {
//   // console.log("🚀 ~ getInputType ~ input:", input)
//   // if (input.inputType === InputTypes.SELECT && input.dependsOn) {
//   //   return <DynamicFormSelect key={input.name} input={input} form={form} />
//   // }
  

//   switch (input.inputType) {
//     case InputTypes.TEXT:
//       return <CustomFormField key={input.name} input={input} form={form} />
//     case InputTypes.SWITCH:
//       return <CustomFormSwitch key={input.name} input={input} form={form} />
//     case InputTypes.SELECT:
//       return <CustomFormSelect key={input.name} input={input} form={form} />
//     case InputTypes.OTP:
//       return <CustomFormFieldOTP key={input.name} input={input} form={form} />
//     case InputTypes.COLOR:
//       return <CustomFormFieldColor key={input.name} input={input} form={form} />
//     case InputTypes.DATE:
//       return <CustomFormDate key={input.name} input={input} form={form}/>
//     case InputTypes.SWITCH_LIST:
//       return <InputSwitchList key={input.name} input={input} form={form} onCheckedChange={input?.listConfig?.onOptionChange ?? (() => {})}/>
//     case InputTypes.GROUPED_SWITCH_LIST:
//       return <AccordionGroupedSwitches
//         form={form}
//         input={input}
//         groups={input?.listConfig?.list as GroupedOption[] ?? []}
//         onChange={input?.listConfig?.onOptionChange ?? (() => {})}
//       />
      
//     case InputTypes.CHECK_LIST:
//       return <InputCheckList key={input.name} input={input} onCheckedChange={input?.listConfig?.onOptionChange ?? (() => {})}/>
//     case InputTypes.NUMBER:
//       return <CustomFieldNumber key={input.name} input={input} form={form} />
//     case InputTypes.FILE:
//       return <CustomFormFile key={input.name} input={input} form={form} />
//     case InputTypes.TEXTAREA:
//       return <CustomFormTextarea key={input.name} input={input} form={form} />
//     case InputTypes.HIDDEN:
//       return <CustomFormFieldHidden key={input.name} input={input} form={form} />
//       // return <input type="hidden" name={input.name} value={input.value} />
//     // case InputTypes.FORM:
//     //   const childSchema = config.formSchema.def.shape[input.name].def.innerType.def.element
//     //   const fieldsConfig  = generateFieldsFromZod(childSchema)


//     default:
//       return ( 
//         <div> <pre>{JSON.stringify(input, null, 2)}</pre> </div>
//       )
//   }
// }

// export const getInputConfig = <T extends Record<string, any>>(
//   fieldsConfig: Array<FieldProps | FieldProps[]>,
//   data: T | undefined | null
// ): FieldProps[] =>
//   fieldsConfig.flatMap((fieldGroup) => {
//     const fields = Array.isArray(fieldGroup) ? fieldGroup : [fieldGroup];
//     const typeList = [
//       InputTypes.SWITCH_LIST,
//       InputTypes.GROUPED_SWITCH_LIST
//     ]

//     return fields.map((field) => {
//       const rawValue = data?.[field.name as keyof T];
//       let value: unknown = rawValue
      
//       value = typeof rawValue === "number" ? rawValue : rawValue ?? "";
//       // value = rawValue === null ? undefined : '';
      
//       if (field.inputType == InputTypes.SELECT) value = rawValue;
      
      
//       if (Array.isArray(rawValue) && typeList.includes(field.inputType)) {
//         value = field?.listConfig?.selectedList;
//       }
      
//       console.warn('============');
//       console.log('rawValue',rawValue);
//       console.log('value',value);
//       return {
//         ...field,
//         value: value,
//         disabled: field.disabled ?? false,
//         hidden: field.hidden ?? false,
//       };
//     });
//   });



  

// export enum InputTypes {
//   HIDDEN = "hidden",
//   TEXT = "text",
//   NUMBER = "number",
//   SWITCH = "switch",
//   SELECT = "select",
//   CHECK_LIST = "checklist",
//   SWITCH_LIST = "switchlist",
//   GROUPED_SWITCH_LIST = "grouped_switchlist",
//   DATE = "date",
//   TEXTAREA = "textarea",
//   FILE = "file",
//   OTP = "otp",
//   FORM = "form",
//   COLOR = "color",
// }

// export enum TextInputType {
//   DEFAULT = "default",
//   NUMBER = "number",
//   EMAIL = "email",
//   PHONE = "phone",
//   PASSWORD = "password",
// }

// export enum ButtonTypes {
//   customBtnElevated = 0,
//   customBtnOutlined = 1,
//   customBtnText = 2,
// }

// export const inputFieldComp = [
//   // InputTypes.GROUPED_SWITCH_LIST,
//   InputTypes.TEXT,
//   InputTypes.SWITCH,
//   InputTypes.COLOR,
//   InputTypes.OTP,
//   InputTypes.SELECT,
//   InputTypes.DATE,
//   InputTypes.FILE,
//   InputTypes.FORM,
//   InputTypes.NUMBER,
//   InputTypes.TEXTAREA,
//   InputTypes.SWITCH_LIST,
//   InputTypes.HIDDEN,
// ]




// export const getDynamicSchema = (fields: Array<FieldProps | FieldProps[]>): ZodObject<any> => {

//   const mapType = (f: FieldProps): ZodTypeAny => {
//     let zf: z.ZodType<any>;

//     if (f.ZodTypeAny) return f.ZodTypeAny;

//     switch (f.inputType) {
//       case "date":
//         zf = z.coerce.date();
//         break;

//       case "otp":
//         zf = z.string().min(4, "OTP mínimo 4 caracteres").max(10, "OTP máximo 10 caracteres");
//         break;

//       case "select":
//         zf = z.string().min(1, "Selecciona un valor");
//         break;

//       case "number":
//         zf = z.number();
//         if (f.min !== undefined) zf = (zf as z.ZodNumber).min(f.min, `Mínimo ${f.min}`);
//         if (f.max !== undefined) zf = (zf as z.ZodNumber).max(f.max, `Máximo ${f.max}`);
//         break;

//       case "email":
//         zf = z.string().email("Email inválido");
//         break;

//       case "url":
//         zf = z.string().url("URL inválida");
//         break;
      
//         case "file":
//         zf = z.any().refine(
//           (file) => {
//             if (!file) return true; // ✅ si no hay archivo, pasa
//             return (
//               file.size <= 25 * 1024 * 1024 &&
//               ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type)
//             );
//           },
//           { message: "El archivo no puede ser mayor de 25MB y solo JPG/PNG/GIF son permitidos" }
//         );
//         break;

//       case "text":
//       default:
//         zf = z.string();
//         const zff = (zf as z.ZodString)
//         if (f.required) zf = zff.min(1, "Campo obligatorio");
//         if (f.min !== undefined) zf = zff.min(f.min, `Mínimo ${f.min} caracteres`);
//         if (f.max !== undefined) zf = zff.max(f.max, `Máximo ${f.max} caracteres`);
//         // if (f.pattern) zf = zff.regex(f.pattern, "Formato inválido");
//         // if (f.email) zf = zff.email("Email inválido");
//         // if (f.url) zf = zff.url("URL inválida");
//         break;
//     }

//     return f.required ? zf : zf.optional();
//   };

//   const flatFields: FieldProps[] = fields.flatMap(f => Array.isArray(f) ? f : [f]);
//   const shape: Record<string, ZodTypeAny> = {};

//   flatFields.forEach(f => {
//     shape[f.name] = mapType(f);
//   });

//   return z.object(shape);
// };


// export interface InputSetup {
//   required: boolean;
//   disabled: boolean;
//   minLegth?: number;
//   maxLength?: number;
//   pattern?: RegExp;
//   min?:number;
//   max?:number;
//   isObscure?:boolean;
//   isEmail?:boolean;
//   isUrl?:boolean;
//   zopType?: z.ZodType
// }


// export const entityToInputOption = (entitiy:any, name:string = 'name', description:string = 'description', groupedLabel?:string): InputOption => ({
//   id: entitiy['id'],
//   name: entitiy[name],
//   description:  entitiy[description],
//   groupedLabel
// })


// export const entitiesToInputOption = (data:any[], optionValue:string = 'name', groupedLabel?:string): InputOption[] => {
//   const entities: InputOption[] = [];
//   for (const key of data) {
//     const entidad = entityToInputOption(key, optionValue, undefined, groupedLabel);
//     if(entidad) entities.push(entidad);
//   }
//   return entities;
// }
// export const entityToGroupedOption = (entitiy:any, name:string = 'name'): GroupedOption => ({
//   id: entitiy['id'],
//   label: entitiy[name] || entitiy['label'],
//   options: entitiy['options'] || [],
// })


// export const entitiesToGroupedOption = (data:any[], optionValue:string = 'name' ): GroupedOption[] => {
//   const entities: GroupedOption[] = [];
//   for (const key of data) {
//     const entidad = entityToGroupedOption(key, optionValue);
//     if(entidad) entities.push(entidad);
//   }
//   return entities;
// }