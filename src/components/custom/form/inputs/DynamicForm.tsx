"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";


import { FieldProps } from "./base";
import { getDefaultValues, getDynamicSchema, InputFactory } from "./input-factory";

interface Props {
  fields: FieldProps[];
  record?: Record<string, any>;
  onSubmit?: (data: any) => void;
}

export const DynamicForm = ({ fields, record = {}, onSubmit }: Props) => {
  // ✅ Genera el schema usando la función dinámica
  const schema = useMemo(() => getDynamicSchema(fields), [fields]);

  // ✅ Obtiene los valores por defecto según la entidad
  const defaultValues = useMemo(() => getDefaultValues(record), [record]);

  // ✅ Configura el formulario con schema y defaultValues
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // 🔁 Redibuja cuando cambian los fields o los valores por defecto
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, fields]);

  const handleSubmit = (data: any) => {
    console.log("✅ Datos enviados:", data);
    onSubmit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 p-4">
        {fields.map((input) => InputFactory.create(input, form))}
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
};
