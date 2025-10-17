// import React, { ReactNode, useEffect, useMemo, useState, useTransition } from 'react'

// import { InputFactory } from './input-factory';
// import { Form, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import type { z } from "zod"
// import { CustomFormProps, FieldProps } from './base';

// // interface CustomFormProps {
// //   formTitle: string
// //   inputConfig: FieldProps[]
// //   fieldsConfig: Array<FieldProps | FieldProps[]>
// //   defaultValues: Record<string, any>
// //   formSchema: z.AnyZodObject
// //   submitBtnLabel?: string
// //   className?: string
// //   isFormChild?: boolean
// //   columns?: number
// //   gap?: number
// //   onSubmit: (values: Record<string, any>) => void
// // }

// interface Props {
//   formConfig: CustomFormProps
//   children?: ReactNode;
//   isActive?: boolean
//   className?: string
// }


// export function DynamicForm({formConfig, children, isActive, className}: Props) {
//   const [fields, setFields] = React.useState<Array<FieldProps| FieldProps[]>>(formConfig?.inputConfig);
//   const [config, setConfig] = useState(formConfig)
//   const [isPending, startTransition] = useTransition()

//   const form = useForm<z.infer<typeof config.formSchema>>({
//     resolver: useMemo(() => zodResolver(formConfig.formSchema), [formConfig.fieldsConfig]),
//     defaultValues: config.defaultValues,
//   })

//   useEffect(() => {
//     form.reset(config.defaultValues);
//   }, [config.defaultValues, config.inputConfig]);

//   useEffect(() => {
//     setConfig(formConfig);
//     setFields(formConfig?.inputConfig)
//   }, [formConfig]);


//   const handleChange = (name: string, value: any) => {
//     setFields((prev) =>
//       prev.map((f) => {
//         if (Array.isArray(f)) {
//           // If f is an array of FieldProps, update the matching field inside the array
//           return f.map((field) =>
//             field.name === name
//               ? Object.assign(Object.create(Object.getPrototypeOf(field)), { ...field, value })
//               : field
//           );
//         } else {
//           // If f is a single FieldProps object
//           return f.name === name
//             ? Object.assign(Object.create(Object.getPrototypeOf(f)), { ...f, value })
//             : f;
//         }
//       })
//     );
//   };

//   const handleSubmit = () => {
//     const data = Object.fromEntries(
//       fields.flatMap((f) =>
//         Array.isArray(f)
//           ? f.map((field) => [field.name, field.value])
//           : [[f.name, f.value]]
//       )
//     );
//     console.log("Formulario:", data);
//     alert(JSON.stringify(data, null, 2));
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSubmit();
//         }}
//         className="max-w-md mx-auto p-4 flex flex-col gap-4 border rounded-xl shadow-sm"
//       >
//         {fields.length}
//         {fields.map((f, idx) =>
//           Array.isArray(f)
//             ? f.map((input, subIdx) => (
//                 <div key={idx} className="mb-4">
//                     {InputFactory.create(input, form)}
//                 </div>
//               ))
//             : (
//                 <React.Fragment key={f.name ?? `${idx}`}>
//                   {InputFactory.create(f, form)}
//                 </React.Fragment>
//               )
//         )}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700"
//         >
//           Guardar
//         </button>
//       </form>
//     </Form>
//   );
// }