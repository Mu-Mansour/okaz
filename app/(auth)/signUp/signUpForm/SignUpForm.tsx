"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/userActions";
import { signUpFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    const result = await signUp(null, values);

    if (!result.success) {
      setError("root", { message: result.message });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label className='mb-1' htmlFor='name'>
            Name
          </Label>
          <Input id='name' type='text' {...register("name")} />
          {errors.name && (
            <p className='text-sm text-destructive mt-1'>
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label className='mb-1' htmlFor='email'>
            Email
          </Label>
          <Input id='email' type='email' {...register("email")} />
          {errors.email && (
            <p className='text-sm text-destructive mt-1'>
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label className='mb-1' htmlFor='password'>
            Password
          </Label>
          <Input id='password' type='password' {...register("password")} />
          {errors.password && (
            <p className='text-sm text-destructive mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <Label className='mb-1' htmlFor='confirmPassword'>
            Confirm Password
          </Label>
          <Input
            id='confirmPassword'
            type='password'
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className='text-sm text-destructive mt-1'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div>
          <Button disabled={isSubmitting} className='w-full' variant='default'>
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </Button>
        </div>

        {errors.root && (
          <div className='text-center text-destructive'>
            {errors.root.message}
          </div>
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
