// "use client"
// import type { UseFormReturn } from "react-hook-form"
// import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
// import { Textarea } from "../../ui/textarea"
// import type { FieldProps } from "./definitions"

// interface Props {
//   form: UseFormReturn
//   input: FieldProps
// }

// export const CustomFormTextarea = ({ form, input }: Props) => {
//   return (
//     <FormField
//       key={input.name}
//       control={form.control}
//       name={input.name}
//       render={({ field }) => (
//         <FormItem className="shadow-lg">
//           <FormLabel><b>{input.label}</b></FormLabel>
//           <FormControl>
//             <Textarea className="min-w-[260px] bg-white" placeholder={input.placeHolder} {...field} disabled={input.disabled}/>
//           </FormControl>
//           {input.description && <FormDescription>{input.description}</FormDescription>}
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }


