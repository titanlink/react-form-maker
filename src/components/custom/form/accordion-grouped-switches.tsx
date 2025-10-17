// 'use client'
// import { GroupedSwitches } from './input-grouped-switches'
// import { UseFormReturn } from 'react-hook-form';
// import { useEffect, useState } from 'react';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge, FormControl, FormDescription, FormField, FormItem, FormMessage, Separator } from '@/components/ui';
// import { FieldProps, GroupedOption, InputOption } from './inputs/base';


// interface Props {
//   form: UseFormReturn
//   input: FieldProps
//   groups?: GroupedOption[]
//   onChange?: (optionsUpdated: InputOption[]) => void
// }

// export const AccordionGroupedSwitches = ({ form, input, groups, onChange }: Props) => {


//   const selectedListToInputOptionList = () : InputOption[] => {
//     const list = input.listConfig?.selectedList?.map(opt => ({
//       ...opt,
//       checked: true
//     }))
//     return list ?? []
//   }

//   const [groupsState, setGroupsState] = useState(groups)
//   const [allOptions, setAllOptions] = useState<InputOption[]>(selectedListToInputOptionList())

//   const getChecked = (options: InputOption[]) : InputOption[] => {
//     const selected = selectedListToInputOptionList()
//     const updated = options.map(opt => ({
//       ...opt,
//       checked: selected?.some(item2 => item2.id === opt.id)
//     }))
//     return updated
//   }


//   const coutCheckedByGroup = (group:GroupedOption): number =>{
//     return allOptions.filter(o => o.checked && o.groupedLabel == group.label).length

//   }
  
//   useEffect(()=>{
//     setGroupsState(groups)
//     const updated = groups?.map(group => ({ ...group, options: getChecked(group?.options) }))
//     setGroupsState(updated)
//     setAllOptions(updated?.flatMap(group => group.options) ?? [])
//   },[input])
  
//   const handleOptionChange = (field: any) => {
//     field.onChange(allOptions.filter(o => o.checked))
//     setAllOptions(groupsState?.flatMap(group => group.options) ?? [])
//     onChange?.(allOptions)
//     console.log("🚀 ~ handleOptionChange ~ allOptions:", allOptions)
//   }
//   return (
//     <FormField
//       key={input.name}
//       control={form.control}
//       name={input.name}
//       render={({ field }) => (
//         <FormItem className="shadow-lg">
//           {/* <FormLabel><b>{input.label}</b></FormLabel> */}
//           <FormControl>

//             <div>
//               <h2 className='text-2xl pb-4 font-bold'>{input.label}</h2>
//               <Separator />
//               <Accordion type="single" collapsible>
//                 {groupsState?.map((group,indx) => (
//                   <AccordionItem key={indx} value={group.label} className={`px-1 ${indx % 2 ? `bg-black/10` : 'bg-black/5'}`}>
//                     <AccordionTrigger>
//                       <div className='grid grid-cols-2 w-full'>
//                         {group.label} <Badge>{coutCheckedByGroup(group)} / {group.options.length}</Badge>
//                       </div>
//                     </AccordionTrigger>
//                     <AccordionContent>
//                       <GroupedSwitches
//                         options={group.options}
//                         onChange={(v)=> handleOptionChange(field)}
//                       />
//                     </AccordionContent>
//                   </AccordionItem>
//                 ))}
//               </Accordion>
//             </div>


//             {/* <Input className="min-w-[180px] bg-white" placeholder={input.placeHolder} {...field} type={input.keyboardType}
//             disabled={input.disabled}/> */}
//           </FormControl>
//           {input.description && <FormDescription> {input.description} </FormDescription>}
//           <FormMessage />
//           {/* <pre className='text-xs font-bold'>  <code>{JSON.stringify(allOptions, null, 2)}</code></pre> */}
//           {/* <pre className='text-xs font-bold'>  <code>{JSON.stringify(input.listConfig?.selectedList, null, 2)}</code></pre> */}
//         </FormItem>
//       )}
//     />

//   )
// }
