'use client'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui"
import { BaseInput } from "../base";
import { JSX } from "react";



export class OTPInput extends BaseInput {
  render(): JSX.Element {
    const { input, form } = this;
    return (
      <FormField
        key={input.name}
        control={form.control}
        name={input.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{input.label}</FormLabel>
            <FormControl>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormDescription>{input.description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
}

