"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  statuses: z.object({ name: z.string() }).array().optional(),
});

export function CreateProjectForm() {
  const session = useSession();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      statuses: [],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control, // control props comes from useForm (optional: if you are using FormContext)
      name: "statuses",
    }
  );

  const handleStatusBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!value) {
      //cleanup empty values
      remove(index);
    }
  };

  const handleAddStatus = () => {
    append({ name: "" });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post("/api/secured/projects", {
        ...values,
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Meaningful text" {...field} />
              </FormControl>
              <FormDescription>
                title is required, but you can edit it later
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>description is optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="border-none h-px bg-slate-400/50" />
        <div>
          <FormLabel>Statuses</FormLabel>
          <div className="mt-2 flex flex-col gap-2">
            {fields.map((field, index) => (
              <FormField
                key={field.id} // Ensure each field has a unique key
                control={form.control}
                name="statuses"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="max-w-[200px]"
                        placeholder="Status name"
                        type="text"
                        {...form.register(`statuses.${index}.name` as const)}
                        onBlur={(e) => handleStatusBlur(e, index)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <FormDescription className="mt-2">
            Statuses are optional, you can create them later
          </FormDescription>
          <Button
            type="button"
            onClick={handleAddStatus}
            className="mt-2"
            size="sm"
            variant="outline"
          >
            Add status
          </Button>
        </div>
        <hr className="border-none h-px bg-slate-400/50" />
        <Button type="submit">Create</Button>
      </form>
    </FormProvider>
  );
}
