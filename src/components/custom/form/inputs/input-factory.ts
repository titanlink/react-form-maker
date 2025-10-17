'use client'
import { UseFormReturn } from "react-hook-form";
import { BaseInput, FieldProps, InputTypes } from "./base";
import { 
  TextInput,
  SelectInput,
  ColorInput,
  DateInput,
  NumberInput,
  SwitchInput,
  GroupedSwitchInput,
  OTPInput,
  FileInput,
  TextAreaInput,
  // SwitchListInput, // ES LO MISMO QUE => GroupedSwitchInput
  // CheckListInput,
} from "./types";
import { JSX } from "react";


type InputClassConstructor = new (
  input: FieldProps,
  form: UseFormReturn
) => BaseInput;


const inputMap: Record<InputTypes, InputClassConstructor> = {
  [InputTypes.TEXT]: TextInput,
  [InputTypes.SWITCH]: SwitchInput,
  [InputTypes.COLOR]: ColorInput,
  [InputTypes.DATE]: DateInput,
  [InputTypes.NUMBER]: NumberInput,
  [InputTypes.SELECT]: SelectInput,
  [InputTypes.GROUPED_SWITCH_LIST]: GroupedSwitchInput,
  [InputTypes.OTP]: OTPInput,
  [InputTypes.FILE]: FileInput,
  [InputTypes.HIDDEN]: TextInput, //ToDo: // puedes asignar algo genérico
  [InputTypes.CHECK_LIST]: TextInput, //ToDo:
  // [InputTypes.SWITCH_LIST]: SwitchListInput, //ToDo:
  [InputTypes.TEXTAREA]: TextAreaInput,
  [InputTypes.FORM]: TextInput, //ToDo:
};

export class InputFactory {
  static create(input: FieldProps, form: UseFormReturn): JSX.Element {
    const inputType = (input.inputType as InputTypes) ?? InputTypes.TEXT;

    const InputClass = inputMap[inputType] ?? TextInput;
    const instance = new InputClass(input, form);
    return instance.render()
  }
}