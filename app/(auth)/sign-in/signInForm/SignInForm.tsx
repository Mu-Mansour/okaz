"use client";
import SignInButton from "@/components/shared/header/SignInButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/actions/userActions";
import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

const CredentialsSignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [data, action] = useActionState(signInWithCredentials, {
    message: "",
    success: false,
  });

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label className='mb-1' htmlFor='email'>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            required
            type='email'
            defaultValue={""}
            autoComplete='email'
          />
        </div>
        <div>
          <Label className='mb-1' htmlFor='password'>
            Password
          </Label>
          <Input
            id='password'
            name='password'
            required
            type='password'
            defaultValue={""}
            autoComplete='current-password'
          />
        </div>
        <div>
          <SignInButton />
          {data && !data.success && (
            <div className='text-center text-destructive'>{data.message}</div>
          )}
        </div>

        <div className='text-sm text-center text-muted-foreground'>
          Don&apos;t have an account?{" "}
          <Link target='_self' className='link' href='/sign-up'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
