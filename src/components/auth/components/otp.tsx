import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/base/input-otp";
import { FieldErrors } from "react-hook-form";

interface OTPFieldProps {
  errors: FieldErrors<{ otp: string }>;
  setValues: (value: string) => void;
  className?: string;
}

export function InputOTPForm({ className, errors, setValues }: OTPFieldProps) {
  return (
    <div className={className}>
      <InputOTP maxLength={6} onChange={setValues}>
        <InputOTPGroup>
          {[...Array(6)].map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {errors.otp && (
        <p className="text-red-500 text-sm">{errors.otp.message}</p>
      )}
    </div>
  );
}
