import type { z } from "zod"




export interface CustomFormProps {
  formTitle: string
  inputConfig: FieldProps[]
  fieldsConfig: Array<FieldProps | FieldProps[]>
  defaultValues: Record<string, any>
  formSchema: z.AnyZodObject
  submitBtnLabel?: string
  className?: string
  isFormChild?: boolean
  permiso?: PermisoAccion
  columns?: number
  gap?: number
  onSubmit: (values: Record<string, any>) => void
}

export interface FieldProps {
  name: string // Campo debe coincidir con la definición en el esquema
  label: string
  placeHolder?: string
  description?: string
  inputType?: InputTypes
  keyboardType: TextInputType
  disabled?: boolean
  required?: boolean
  value?: any
  min?: number,
  max?: number,
  ZodTypeAny?: z.ZodTypeAny
  
  list?: any[]
  dependsOn?: string // Nombre del campo del que depende este campo
  loadOptions?: (dependencyValue: any) => Promise<any[]> // Función para cargar opciones dinámicamente
  optionLabel?: string // Propiedad a mostrar como etiqueta en el select
  optionValue?: string // Propiedad a usar como valor en el select
  optionDescription?: string // Propiedad a usar como valor en el select
  hidden?:boolean
  onListOptionChange?: (item: any) => void


  listConfig?: ListConfig

  fileConfig?: {
    previewSize?: number
    showPreview?: boolean
    accept: string // tipos de archivo permitidos
    multiple: boolean // múltiples archivos
    maxSize: number
  }
}


interface ListConfig {
  list: InputOption[]
  optionLabel: string
  optionValue: InputOption| string | number | object
  onOptionChange: (item: InputOption ) => void
  optionDescription?: string
  selectedList?: InputOption[]
}

export interface InputOption {
  id: number
  name: string
  description?: string
  disabled?: boolean
}


