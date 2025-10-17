// import type { UseFormReturn } from "react-hook-form"
// import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
// import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../../ui/input-otp"
// import { FieldProps } from "./definitions"

// interface Props {
//   form: UseFormReturn
//   input: FieldProps
// }

// export const CustomFormFieldOTP = ({ form, input }: Props) => {
//   return (
//     <FormField
//       key={input.name}
//       control={form.control}
//       name={input.name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>{input.label}</FormLabel>
//           <FormControl>
//             <InputOTP maxLength={6}>
//               <InputOTPGroup>
//                 <InputOTPSlot index={0} />
//                 <InputOTPSlot index={1} />
//                 <InputOTPSlot index={2} />
//               </InputOTPGroup>
//               <InputOTPSeparator />
//               <InputOTPGroup>
//                 <InputOTPSlot index={3} />
//                 <InputOTPSlot index={4} />
//                 <InputOTPSlot index={5} />
//               </InputOTPGroup>
//             </InputOTP>
//           </FormControl>
//           <FormDescription>{input.description}</FormDescription>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }

