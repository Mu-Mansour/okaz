"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/userActions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const SignUpForm = () => {
  const [data, action] = useActionState(signUp, {
    message: "",
    success: false,
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? "Submitting..." : "Sign Up"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label className='mb-1' htmlFor='name'>
            Name
          </Label>
          <Input required id='name' name='name' type='text' defaultValue={""} />
        </div>
        <div>
          <Label className='mb-1' htmlFor='email'>
            Email
          </Label>
          <Input
            required
            id='email'
            name='email'
            type='email'
            defaultValue={""}
          />
        </div>
        <div>
          <Label className='mb-1' htmlFor='password'>
            Password
          </Label>
          <Input
            required
            id='password'
            name='password'
            type='password'
            defaultValue={""}
          />
        </div>
        <div>
          <Label className='mb-1' htmlFor='confirmPassword'>
            Confirm Password
          </Label>
          <Input
            required
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            defaultValue={""}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {!data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          Already have an account?{" "}
          <Link
            target='_self'
            className='link'
            href={`/signIn?callbackUrl=${callbackUrl}`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
