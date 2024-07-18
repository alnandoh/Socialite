"use client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    console.log(values);

    // if (result?.error) {
    //   toast({
    //     description: result.error,
    //     variant: "destructive",
    //   });
    // } else {
    //   toast({
    //     description: "Successfully logged in",
    //   });
    //   router.push("/login");
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abc@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
