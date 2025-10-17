import React from 'react'
import { FieldValues, FormState } from 'react-hook-form'
import { CustomAlert } from '../../../custom-alert'
import { FieldProps } from './definitions'


interface Props<T extends FieldValues> {
  formState: FormState<T>
  fields: Array<FieldProps|FieldProps[]>
}

export const FormErrors = <T extends FieldValues,>({formState, fields}: Props<T>) => {

  const flatFields: FieldProps[] = fields.flatMap(f => Array.isArray(f) ? f : [f]);
  return (
    <>
    { Object.entries(formState.errors).length > 0 && (
      <CustomAlert 
      title="Revisar los siguientes criterios" 
      description={
      <ul>
        {/* <pre><code>{JSON.stringify(flatFields,null,2)}</code></pre> */}
        {Object.entries(formState?.errors).map(([key, value]) => (
          <li key={key}>
            <strong>{ getFieldLabel(key, flatFields) }:</strong> {value?.message?.toString() ?? ''}
          </li>
        ))}
      </ul>}
      className="mb-4" 
      variant="error" />)}
    </>
  )
}

const getFieldLabel  = (fieldErrorKey: string, fields: FieldProps[]) => {
  const findedField =  fields.find((field) => field.name == fieldErrorKey)
  return findedField?.label ?? fieldErrorKey
}
