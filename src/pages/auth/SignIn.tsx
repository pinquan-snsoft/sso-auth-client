import { SignIn } from "@/components/auth";

export default function SignInPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <SignIn />
      </div>
    </div>
  );
}
