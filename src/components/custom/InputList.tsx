import React from 'react'
import { FieldProps } from './form/definitions'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { InputTypes, TextInputType } from './form/CustomForm'


interface Props {
  inputsTypes: InputTypes[]
  handleAddInput: ( inputType:InputTypes ) => void
}
export const InputList = ({ handleAddInput, inputsTypes }:Props) => {
  return (
    <div className='grid grid-cols-1 gap-2 p-2'>
      {inputsTypes.map((inputType) => 
        <Button onClick={()=> handleAddInput(inputType)} className='w-full'>
          {inputType}
          <Plus/>
        </Button>
      )}
    </div>
  )
}
