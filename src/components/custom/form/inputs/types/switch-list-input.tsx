// 'use client'
// import { Card, CardContent, CardHeader, CardTitle, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Switch } from '@/components/ui';
// import { BaseInput, InputOption } from '../base'
// import { JSX } from 'react';


// // interface Props {
// //   title?: string,
// //   input: FieldProps,
// //   form: UseFormReturn,
// //   onCheckedChange: (value : InputOption) => void
// // }

// // export const InputSwitchList = ({input, onCheckedChange, form , title}:Props) => {
// export class SwitchListInput extends BaseInput {
//   render(): JSX.Element {
//     const { input, form } = this;
//     let lista = input?.listConfig?.list ?? [] as InputOption[]
//     if (lista == undefined) lista = []


//     // const initValue: string[] = input.value ?? []
//     // const label = input.optionLabel ?? "name"
//     // const optionValue = input.optionValue ?? "id"
//     // const description = input.optionDescription ?? "description"
//     return (
//       <FormField
//         key={input.name}
//         control={form.control}
//         name={input.name}
//         render={({ field }) => (
//           <Card className='grid grid-cols-1 bg-blue-200/10'>
//             <CardHeader>
//               <CardTitle className="text-base">{input.label}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {lista
//                 .filter((item): item is InputOption => (item as InputOption).name !== undefined)
//                 .map((item, index) => ( 
//                   <FormItem key={index} className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2  shadow-sm h-12 bg-blue-100/20">
//                     <div className="space-y-0.5">
//                       <FormLabel>{item?.label}</FormLabel>
//                       <FormDescription>{input.description}</FormDescription>
//                       <FormMessage />
//                     </div>
//                     <FormControl>
//                       <Switch 
//                         checked={!!input.listConfig?.selectedList?.find((option) => option.id == item.id)} 
//                         onCheckedChange={() => {/* 'onCheckedChange(item)' */}} 
//                         aria-readonly 
//                         disabled={input.disabled}/>
//                     </FormControl>
//                   </FormItem>
//                 ))}
//               <pre> {JSON.stringify(field, null, 2)}</pre> 
//             </CardContent>
//           </Card>
//         )} 
//       />
//     )
//   }
// }
