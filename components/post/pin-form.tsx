"use client"
import * as z from "zod";
import { Button } from "@/components/ui/button"
import {
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/lib/actions/posts";

interface PostFormProps {
  latitude: number,
  longitude: number,
  region: string,
  onSuccess: () => void,
}

const pinFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export default function PostForm({
  latitude,
  longitude,
  region,
  onSuccess,
}: PostFormProps) {

  const form = useForm<z.infer<typeof pinFormSchema>>({
    resolver: zodResolver(pinFormSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function submitForm(values: z.infer<typeof pinFormSchema>) {
    try {
      const payload = {
        title: values.title,
        content: values.content,
        latitude,
        longitude,
      };
      await createPost(payload);
      onSuccess();
    } catch (error) {
      console.error("Failed to create post:", error);
      // Optionally add user-facing toast/error message here
    }
  }
  return (
    <form className="w-full max-w-md" onSubmit={form.handleSubmit(submitForm)}>
      <FieldSet className="p-4 space-y-4">
        <FieldGroup className="space-y-1">
          <FieldLabel className="leading-none">
            Title
          </FieldLabel>
          <Input
            id="pin-title"
            placeholder="A Calm Night in Paris"
            maxLength={50}
            required
            {...form.register("title")}
          />
        </FieldGroup>

        <FieldGroup className="space-y-1">
          <FieldLabel className="leading-none">
            Description
          </FieldLabel>
          <Textarea
            id="pin-form"
            placeholder="What is on your mind at this very moment?"
            rows={4}
            maxLength={250}
            required
            {...form.register("content")}
          />
        </FieldGroup>

        <Button type="submit" className="w-full" >
          Post
        </Button>
      </FieldSet>
    </form>

  );
}