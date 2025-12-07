"use server";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { SignUpFormData } from "@/types";
import { hashSync } from "bcrypt-ts";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import { signInFormSchema } from "../validator";
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}
export async function signOutUser() {
  await signOut();
}
export async function signUp(prevState: unknown, formData: SignUpFormData) {
  try {
    const plainPassword = formData.password;

    formData.password = hashSync(formData.password, 10);

    await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    });

    await signIn("credentials", {
      email: formData.email,
      password: plainPassword,
    });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
}
