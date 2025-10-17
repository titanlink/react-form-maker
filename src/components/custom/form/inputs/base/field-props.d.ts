// import type { z } from "zod"

// export interface FieldProps {
//   name: string // Campo debe coincidir con la definición en el esquema
//   label: string
//   placeHolder?: string
//   description?: string
//   inputType?: InputTypes
//   keyboardType?: TextInputType
//   disabled?: boolean
//   required?: boolean
//   value?: any
//   min?: number,
//   max?: number,
//   className?: string
//   ZodTypeAny?: z.ZodTypeAny
  
//   // list?: any[]
//   // dependsOn?: string // Nombre del campo del que depende este campo
//   // loadOptions?: (dependencyValue: any) => Promise<any[]> // Función para cargar opciones dinámicamente
//   // optionLabel?: string // Propiedad a mostrar como etiqueta en el select
//   // optionValue?: string // Propiedad a usar como valor en el select
//   // optionDescription?: string // Propiedad a usar como valor en el select
//   // hidden?:boolean
//   // onListOptionChange?: (item: any) => void


//   listConfig?: ListConfig

//   fileConfig?: {
//     previewSize?: number
//     showPreview?: boolean
//     accept: string // tipos de archivo permitidos
//     multiple: boolean // múltiples archivos
//     maxSize: number
//   }
// }

// export interface InputOption {
//   id: number | string
//   name: string
//   label?: string
//   description?: string
//   disabled?: boolean
//   checked?: boolean
//   groupedLabel?: string
// }
// export interface GroupedOption {
//   id?: number
//   name?: string
//   label: string
//   options: InputOption[]
//   totalSelected?: number
//   disabled?: boolean
// }

// interface ListConfig {
//   title?:string
//   list: InputOption[] | GroupedOption[]
//   optionLabel?: string
//   optionValue?: InputOption| string | number | object
//   onOptionChange: (item?: InputOption | InputOption[] | GroupedOption ) => void
//   optionDescription?: string
//   selectedList?: InputOption[]
// }