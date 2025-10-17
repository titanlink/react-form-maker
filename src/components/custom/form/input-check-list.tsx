// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Label } from '@/components/ui/label'
// import { FieldProps, InputOption } from './definitions'


// interface Props {
//   title?: string,
//   input: FieldProps,
//   onCheckedChange: (value : InputOption) => void
// }

// export const InputCheckList = ({input, onCheckedChange, title}:Props) => {
//   let lista = input.list ?? []
//   if (lista == undefined) lista = []


//   const value: string[] = input.value
//   const label = input.optionLabel ?? "name"
//   const optionValue = input.optionValue ?? "id"
//   const description = input.optionDescription ?? "description"
//   return (
//     <Card key={title}>
//       <CardHeader className="pb-3">
//         <CardTitle className="text-base">{title ?? input.label}</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-3">
//       {lista.map((item) => ( 
//         <div key={item[optionValue]} className="flex items-center space-x-2">
//           <Checkbox
//             id={optionValue}
//             checked={value.includes(item[optionValue])}
//             onCheckedChange={() => onCheckedChange(item[optionValue])}
//           />
//           <div className="grid gap-1.5 leading-none">
//             <Label
//               htmlFor={optionValue}
//               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//             >
//               {item[label]}
//             </Label>
//             <p className="text-xs text-muted-foreground">{item[description]}</p>
//           </div>
//         </div>
//         )
//       )}
//       </CardContent>
//     </Card>
//   )
// }
