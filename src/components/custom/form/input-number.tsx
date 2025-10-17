// import type { UseFormReturn } from "react-hook-form"
// import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
// import { Input } from "../../ui/input"
// import { FieldProps } from "./definitions"

// interface Props {
//   form: UseFormReturn
//   input: FieldProps
// }

// export const CustomFieldNumber = ({ form, input }: Props) => {
//   return (
//     <FormField
//       key={input.name}
//       control={form.control}
//       name={input.name}
//       render={({ field }) => (
//         <FormItem >
//           <FormLabel><b>{input.label}</b></FormLabel>
//           <FormControl>
//             <Input className="min-w-[180px] bg-white" placeholder={input.placeHolder} {...field} type="number"  disabled={input.disabled}/>
//           </FormControl>
//           <FormDescription>{input.description}</FormDescription>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }

