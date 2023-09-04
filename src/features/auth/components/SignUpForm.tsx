"use client";

import { SignUpResponseBody } from "@/app/api/auth/signup/route";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const passwordRequirements = z
  .string()
  .regex(/^(?=.*[A-Z].*[A-Z])/, "Ensure string has two uppercase letters.")
  .regex(/^(?=.*[!@#$&*])/, "Ensure string has one special case letter.")
  .regex(/^(?=.*[0-9].*[0-9])/, "Ensure string has two digits.")
  .regex(
    /^(?=.*[a-z].*[a-z].*[a-z])/,
    "Ensure string has three lowercase letters."
  )
  .min(8, "Ensure string is of length 8.");

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: passwordRequirements,
});

export function SignUpForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post<SignUpResponseBody>("/api/auth/signup", values)
      .then(({ data }) => {
        toast({
          title: "Success!",
          description: data.message,
          className: "bg-green-100 border-green-300 text-green-500",
        });
      })
      .catch((err: AxiosError<SignUpResponseBody>) => {
        form.setError("email", { message: "" });
        form.setError("username", { message: "" });
        form.setError("password", { message: "" });

        toast({
          title: "Error",
          description: err.response?.data.message,
          className: "bg-red-100 border-red-300 text-red-500",
        });
      });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </FormProvider>
  );
}
