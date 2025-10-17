import React, { useEffect, useState } from 'react'
import { buildFormConfig, CustomForm, inputFieldComp, InputSetup, InputTypes, TextInputType } from './CustomForm';
import { FieldProps } from './definitions';
import z from 'zod';
import inputErrors from './input-errors';
import { InputList } from '../input-list';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DynamicForm } from './inputs/DynamicForm';
import { DynamicFormExample } from './inputs';


export const Playground = () => {

  const title = "TEST-FORM";
  const entity = {};

  // ✅ Estado de campos dinámicos
  const [fieldsConfig, setFieldsConfig] = useState<Array<FieldProps| FieldProps[]>>([]);

  // ✅ Estado de configuración del formulario
  const [formConfig, setFormConfig] = useState(() =>
    buildFormConfig<any>({
      fieldsConfig,
      entity,
      title,
    })
  );


  // ✅ Agregar input dinámico
  const handleAddInput = (inputType: InputTypes, setup?: InputSetup) => {
    const disabled = Math.random() < 0.5;
    const required = Math.random() < 0.5;
    const uuid= crypto.randomUUID().slice(0,4)
    const newInput: FieldProps = {
      name: `${inputType}_${uuid}`,
      label: `label_${inputType}_${uuid}`,
      placeHolder: `Escribe (${inputType})`,
      inputType: inputType,
      keyboardType: TextInputType.DEFAULT,
      disabled: setup?.disabled ?? disabled,
      required: setup?.required ?? required,
      description: ``,
      ZodTypeAny: z.string(inputErrors.required).min(required ? 1 : 0, { message: inputErrors.required }) ,
    }
    setFieldsConfig((prev) => [...prev, [newInput]]);
  };

  // ✅ Reconstruir config cada vez que cambien los campos
  useEffect(() => {
    const config = buildFormConfig<any>({
      fieldsConfig,
      entity,
      title,
    });
    config.onSubmit = (data) => handleSubmit(data);
    config.className = "grid grid-cols-1 gap-4"
    setFormConfig(config);
  }, [fieldsConfig]);

  // ✅ Submit
  const handleSubmit = async (data: any) => {
    console.log('.............handleSubmit')
    // toast.info(<pre><b>{JSON.stringify(data, null, 2)}</b></pre>);
  };
  return (
    <div className='grid grid-cols-3 w-full gap-4'>

      <div className='flex flex-col  w-full h-full'> 
        <InputList inputsTypes={inputFieldComp} handleAddInput={handleAddInput}/>
      </div>

      <div className='flex flex-col  w-full h-full'>
        {/* <CustomForm formConfig={formConfig} /> */}
        {/* <DynamicForm formConfig={formConfig} /> */}
        <DynamicFormExample />
      </div>

      <div className='flex flex-col bg-gray-200 rounded-xl'>
      <ScrollArea className="h-200 w-full rounded-md  p-4">
        <pre className="mt-4 text-xs text-gray-500">
          <code>{JSON.stringify(fieldsConfig, null, 2)}</code>
        </pre>
        </ScrollArea>
      </div>
    </div>
  )
}
