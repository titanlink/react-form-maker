"use client";

import z from "zod";
import { FieldProps, InputTypes } from "./base";
import { DynamicForm } from "./DynamicForm";


export const DynamicFormExample = ()  => {
  const record = {
    username: "LuisAngel",
    email: "luis@example.com",
    isActive: true,
    favoriteColor: "#00ff99",
    age: 25,
    role: "editor",
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <DynamicForm
        fields={mockFields}
        record={record}
        onSubmit={(data) => console.log("📤 Resultado final:", data)}
      />
    </div>
  );
}

export const mockFields: FieldProps[] = [
    // 🧍‍♂️ Campo requerido simple
    {
      name: "username",
      label: "Nombre de usuario",
      inputType: InputTypes.TEXT,
      required: true,
      ZodTypeAny: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(20, "El nombre no puede tener más de 20 caracteres"),
    },

    // 📧 Campo de correo con validación personalizada (ZodTypeAny)
    {
      name: "email",
      label: "Correo electrónico",
      inputType: InputTypes.TEXT,
      required: false,
      ZodTypeAny: z
        .string()
        .email("Correo inválido")
        .toLowerCase()
        .refine((val) => !val.endsWith("@spam.com"), {
          message: "No se permiten correos de spam.com",
        }),
    },

    // 🔒 Campo opcional (no requerido)
    {
      name: "password",
      label: "Contraseña",
      inputType: InputTypes.TEXT,
      required: false,
      ZodTypeAny: z
        .string()
        .min(6, "Debe tener al menos 6 caracteres")
        .max(20, "No más de 20 caracteres")
        .optional(),
    },

    // 🟢 Campo tipo switch (boolean)
    {
      name: "isActive",
      label: "Usuario activo",
      inputType: InputTypes.SWITCH,
      required: false,
      ZodTypeAny: z.boolean().default(true),
    },

    // 🎨 Color con validación personalizada
    {
      name: "favoriteColor",
      label: "Color favorito",
      inputType: InputTypes.COLOR,
      required: false,
      ZodTypeAny: z
        .string()
        .regex(/^#([0-9A-Fa-f]{6})$/, "Debe ser un color hexadecimal válido"),
    },

    // 🔢 Número con rango
    {
      name: "age",
      label: "Edad",
      inputType: InputTypes.NUMBER,
      required: true,
      ZodTypeAny: z
        .number()
        .min(18, "Debe ser mayor de 18")
        .max(99, "Debe ser menor de 99"),
    },

    // 📅 Fecha
    {
      name: "birthDate",
      label: "Fecha de nacimiento",
      inputType: InputTypes.DATE,
      required: true,
      ZodTypeAny: z.coerce.date().refine((d) => d < new Date(), {
        message: "La fecha no puede ser futura",
      }),
    },

    // 🎓 Select con validación personalizada
    {
      name: "role",
      label: "Rol de usuario",
      inputType: InputTypes.SELECT,
      required: true,
      listConfig: {
        onOptionChange: () =>{},
        list: [
          { id: 1, name: "Administrador", value: "admin" },
          { id: 2, name: "Editor", value: "editor" },
          { id: 3, name: "Lector", value: "reader" },
        ]
      },
      ZodTypeAny: z.enum(["admin", "editor", "reader"]),
    },

    // 🧾 Campo tipo archivo (file)
    {
      name: "profileImage",
      label: "Imagen de perfil",
      inputType: InputTypes.FILE,
      required: false,
      ZodTypeAny: z
        .any()
        .refine(
          (file) => {
            if (!file) return true;
            return (
              file.size <= 10 * 1024 * 1024 &&
              ["image/jpeg", "image/png"].includes(file.type)
            );
          },
          { message: "Solo se permiten imágenes JPG o PNG de menos de 10MB" }
        )
        .optional(),
    },

    // 🔢 OTP (código)
    {
      name: "otpCode",
      label: "Código OTP",
      inputType: InputTypes.OTP,
      required: true,
      ZodTypeAny: z
        .string()
        .min(4, "Debe tener al menos 4 dígitos")
        .max(6, "Debe tener máximo 6 dígitos"),
    },
  ];