"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z, ZodTypeAny, ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldProps } from "./base";
import { InputFactory } from "./input-factory";

interface DynamicFormExampleProps {
  fields: FieldProps[];
  onSubmit?: (data: any) => void;
}

export const DynamicFormExample = ({ fields, onSubmit }: DynamicFormExampleProps) => {
  // ✅ Genera el schema dinámicamente según los ZodTypeAny de los fields
  const schema = useMemo(() => {
    const shape: Record<string, ZodTypeAny> = {};

    for (const field of fields) {
      // Si el field tiene ZodTypeAny, úsalo. Si no, usa z.any()
      shape[field.name] = field.ZodTypeAny ?? z.any();
    }

    return z.object(shape);
  }, [fields]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  // 🔁 Redibuja cuando cambian los fields externos
  useEffect(() => {
    form.reset();
  }, [fields]);

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
