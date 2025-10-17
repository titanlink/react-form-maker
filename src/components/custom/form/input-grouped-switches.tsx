// "use client"

// import React, { useState } from "react"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { InputOption } from "./definitions"


// interface Props {
//   options: InputOption[]
//   onChange?: (optionsUpdated: InputOption[]) => void
// }

// export const GroupedSwitches = ({ options, onChange, }: Props) => {

//   const [switches, setSwitches] = useState<InputOption[]>( options )
//   const [allChecked, setAllChecked] = useState(false)
  

//   const handleMainToggle = (checked: boolean) => {
//     switches.forEach(opt => { handleChildToggle(opt, checked) })
//     setAllChecked(checked)
//   }

//   const handleChildToggle = (option: InputOption, checked: boolean) => {
//     switches.forEach(opt => { if (opt.id === option.id) opt.checked = checked })
//     setAllChecked(!switches.some((opt) => !opt.checked))
//     setSwitches(switches)
//     onChange?.(switches.filter((opt) => opt.checked))
//   }

//   return (
//     <div  className={`space-y-4 p-4  border-2 rounded-xl ${allChecked ? 'bg-green-500/5 border-green-400/10' : ''}`}>
//       {/* Switch principal */}
//       <div className="flex items-center justify-between border-b pb-2">
//         <Label htmlFor="main">Seleccionar todo</Label>
//         <Switch id="main" checked={allChecked} onCheckedChange={handleMainToggle} />
//       </div>

//       {/* Switches hijos */}
//       {switches.map((opt, index) => (
//         <div key={opt.id} className={`p-2 rounded-lg flex flex-row w-full items-center justify-between ${!(index % 2 )? 'bg-black/20' : 'bg-white/5'}`}>
//           <Label htmlFor={opt.id.toString()}>{opt.label || opt.name}</Label>
//           <Switch
//             id={opt.id.toString()}
//             checked={opt.checked || false}
//             onCheckedChange={checked => handleChildToggle(opt, checked)}
//           />
//         </div>
//       ))}
//     </div>
//   )
// }
