// import type { UseFormReturn } from "react-hook-form"
// import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
// import { Switch } from "../../ui/switch"
// import { FieldProps } from "./definitions"
// import { Card } from "@/components/ui/card"


// interface Props {
//   form: UseFormReturn
//   input: FieldProps
//   className?: string

// }

// export const CustomFormSwitch = ({ form, input, className }: Props) => {
//   return (
//     <FormField
//       key={input.name}
//       control={form.control}
//       name={input.name}
//       render={({ field }) => (
//         <Card className={`${ className ? className : 'p-3 shadow-lg bg-blue-100/20'}`}>

//           <FormItem className="flex flex-row items-center justify-between rounded-lg">
//             <div className="space-y-0.5">
//               <FormLabel><b>{input.label}</b></FormLabel>
//               <FormDescription>{input.placeHolder ?? input.description}</FormDescription>
//               <FormMessage />
//           </div>
//           <FormControl>
//             <Switch checked={field.value} onCheckedChange={field.onChange} aria-disabled  disabled={input.disabled}/>
//           </FormControl>
//         </FormItem>
//         </Card>
//       )}
//     />
//   )
// }

