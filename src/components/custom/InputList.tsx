import React from 'react'
import { FieldProps } from './form/definitions'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'


interface Props {
  inputs: FieldProps[]
  handleAddInput: ( input:FieldProps ) => void
}
export const InputList = ({ handleAddInput, inputs }:Props) => {
  return (
    <div className='grid grid-cols-1 gap-2 p-2'>
      {inputs.map((input) => 
        <Button onClick={()=> handleAddInput(input)} className='w-full'>
          {input.inputType}
          <Plus/>
        </Button>
      )}
    </div>
  )
}
