import React, { useEffect, useState } from 'react'
import { buildFormConfig, CustomForm, InputTypes, TextInputType } from './CustomForm';
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
  const [fieldsConfig, setFieldsConfig] = useState<Array<FieldProps| FieldProps[]>>([
    [{
      name: "path",
      label: "Path",
      placeHolder: "Escribe (path)",
      inputType: InputTypes.DATE,
      keyboardType: TextInputType.DEFAULT,
      optionLabel: "name",
      optionValue: "id",
    },],
    {
      name: "active",
      label: "Activo",
      placeHolder: ``,
      inputType: InputTypes.TEXT,
      keyboardType: TextInputType.DEFAULT,
    },
  ]);

  // ✅ Estado de configuración del formulario
  const [formConfig, setFormConfig] = useState(() =>
    buildFormConfig<any>({
      formSchema,
      fieldsConfig,
      entity,
      title,
    })
  );

  const inputsAvaibles: FieldProps[] = [
    {
      name: "path",
      label: "Path",
      placeHolder: "Escribe (path)",
      inputType: InputTypes.DATE,
      keyboardType: TextInputType.DEFAULT,
      optionLabel: "name",
      optionValue: "id",
    },
    {
      name: "name",
      label: "name",
      placeHolder: "Escribe (name)",
      inputType: InputTypes.TEXT,
      keyboardType: TextInputType.DEFAULT,
      optionLabel: "name",
      optionValue: "id",
    },
    {
      name: "name",
      label: "name",
      placeHolder: "Escribe (name)",
      inputType: InputTypes.SWITCH,
      keyboardType: TextInputType.DEFAULT,
      optionLabel: "name",
      optionValue: "id",
    },
  ]

  // ✅ Agregar input dinámico
  const handleAddInput = (input: FieldProps) => {
    setFieldsConfig((prev) => [...prev, [input]]);
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
      <div className='flex flex-col bg-amber-300 w-300 h-150'> 
        <InputList inputs={inputsAvaibles} handleAddInput={handleAddInput}/>
      </div>
      <div className='flex flex-col bg-amber-500 w-300 h-150'>
        <CustomForm formConfig={formConfig} />
      </div>

      <pre className="mt-4 text-xs text-gray-500">
        {JSON.stringify(fieldsConfig, null, 2)}
      </pre>
    </div>
  )
}
