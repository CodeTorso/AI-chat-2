"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { toast } from "~/components/ui/use-toast";
import { marked } from "marked";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { run } from "~/lib/actions";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";

const FormSchema = z.object({
  search: z.string().min(8, {
    message: "Minimum 8 charaters required to serach.",
  }),
});

export default function HomePage() {
  const [value, setValue] = useState("");
  const [pending, setPending] = useState<boolean>(false);
  const content = marked(value);

  function pendingTrue() {
    setPending(true);
  }

  async function valuefn(data: { search: string }) {
    setValue(await run(data.search));
    setPending(false);
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    form.setFocus("search");
  }, [form.setFocus]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Your search is processing...",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">it might take upto 12 seconds</code>
        </pre>
      ),
    });
    pendingTrue();
    valuefn(data);
  }

  return (
    <main className="flex flex-col items-center gap-16 py-24">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search..."
                      // className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    start searching <span>minimum 8</span> characters required.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={pending}
              className="w-full flex items-center gap-2"
              variant="outline"
              type="submit"
            >
              {pending ? <p>Searching...</p> : "Search"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-[70rem] max-w-[90vw] flex justify-center">
        {pending ? (
          <MessageSkeleton />
        ) : (
          <div
            className="flex flex-col gap-5 break-words font-normal sm:px-0 md:text-base lg:text-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </main>
  );
}

function MessageSkeleton() {
  return (
    <div className="flex w-full flex-col space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/12" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-7/12" />
      </div>
    </div>
  );
}
