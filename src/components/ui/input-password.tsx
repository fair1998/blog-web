"use client";

import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export interface InputPasswordProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  iconSize?: number;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, iconSize = 16, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <InputGroup className={className}>
        <InputGroupInput
          ref={ref}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={iconSize} />
            ) : (
              <Eye size={iconSize} />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
