'use client'
import { UseFormReturn } from "react-hook-form";
import { BaseInput } from "./base";
import { 
  TextInput,
  SelectInput,
  ColorInput,
  DateInput,
  NumberInput,
  SwitchInput,
  GroupedSwitchInput,
  OTPInput,
  // SwitchListInput,
  // CheckListInput,
} from "./types";
import { JSX } from "react";
import { FieldProps } from "../definitions";



export class InputFactory {
  static create(input: FieldProps, form: UseFormReturn): JSX.Element {
    const inputMap: Record<string, new (input: FieldProps, form: UseFormReturn) => BaseInput> = {
      text: TextInput,
      select: SelectInput,
      color: ColorInput,
      date: DateInput,
      number: NumberInput,
      switch: SwitchInput,
      grouped_switchlist: GroupedSwitchInput,
      opt: OTPInput,
      // switchlist: SwitchListInput,
      // checklist: CheckListInput,
      // etc...
    };

    const InputClass = inputMap[input.inputType ?? "text"];
    const instance = new InputClass(input, form);
    return instance.render();
  }
}