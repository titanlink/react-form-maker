"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFactory } from "./input-factory";
import { FieldProps } from "../definitions";

const schema = z.object({
  username: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Correo inválido"),
  color: z.string().min(4, "Mínimo 4 caracteres"),
});

export const DynamicFormExample = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { username: "", email: "" },
  });

  const inputs: FieldProps[] = [
    { name: "username", label: "Nombre de usuario", inputType: "text" },
    { name: "email", label: "Correo electrónico", inputType: "text" },
    { name: "color", label: "Correo electrónico", inputType: "color" },
  ];

  const onSubmit = (data: any) => {
    console.log("✅ Datos enviados:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {inputs.map((input) => InputFactory.create(input, form))}
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
