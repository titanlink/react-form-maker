import React, { useEffect, useState } from 'react'
import { buildFormConfig, CustomForm, inputFieldComp, InputTypes, TextInputType } from './CustomForm';
import { FieldProps } from './definitions';
import z from 'zod';
import inputErrors from './input-errors';
import { toast } from 'sonner';
import { InputList } from '../InputList';

// ✅ Schema de validación
const formSchema = z.object({
  id: z.number().optional().default(0),
  path: z
    .any()
    .refine(
      (file) => {
        if (!file) return true; // ✅ si no hay archivo, pasa
        return (
          file.size <= 25 * 1024 * 1024 &&
          ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type)
        );
      },
      { message: "El archivo no puede ser mayor de 25MB y solo JPG/PNG/GIF son permitidos" }
    ),
  type: z.string().min(1, { message: inputErrors.required }),
  active: z.boolean().optional().default(true),
});


export const Playground = () => {

  const title = "TEST-FORM";
  const entity = {};

  // ✅ Estado de campos dinámicos
  const [fieldsConfig, setFieldsConfig] = useState<Array<FieldProps| FieldProps[]>>([]);

  // ✅ Estado de configuración del formulario
  const [formConfig, setFormConfig] = useState(() =>
    buildFormConfig<any>({
      formSchema,
      fieldsConfig,
      entity,
      title,
    })
  );


  // ✅ Agregar input dinámico
  const handleAddInput = (inputType: InputTypes) => {
    const disabled = Math.random() < 0.5;
    const required = Math.random() < 0.5;
    const uuid= crypto.randomUUID().slice(0,4)
    const newInput: FieldProps = {
      name: `${inputType}_${uuid}`,
      label: `${inputType}_${uuid}`,
      placeHolder: "Escribe (name)",
      inputType: inputType,
      keyboardType: TextInputType.DEFAULT,
      disabled,
      required,
      // description: `esto es un ${inputType}`,
    }
    setFieldsConfig((prev) => [...prev, [newInput]]);
  };

  // ✅ Reconstruir config cada vez que cambien los campos
  useEffect(() => {
    const config = buildFormConfig<any>({
      formSchema,
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
    toast.info(<pre><b>{JSON.stringify(data, null, 2)}</b></pre>);
  };
  return (
    <div className='flex flex-row w-300 h-150'>
      <div className='flex flex-col  w-300 h-150'> 
        <InputList inputsTypes={inputFieldComp} handleAddInput={handleAddInput}/>
      </div>
      <div className='flex flex-col  w-300 h-150'>
        <CustomForm formConfig={formConfig} />
      </div>

      <pre className="mt-4 text-xs text-gray-500">
        {JSON.stringify(fieldsConfig, null, 2)}
      </pre>
    </div>
  )
}
