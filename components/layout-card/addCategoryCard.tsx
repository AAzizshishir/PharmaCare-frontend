"use client";

import z from "zod";

import { useForm } from "@tanstack/react-form";

import { toast } from "sonner";
import { addCategoryByAdmin } from "@/app/actions/category.actions";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

const AddCategoryCard = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding Category");
      try {
        const { data } = await addCategoryByAdmin(value);
        const error = data.error;
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Category Added Successfully", { id: toastId });
        form.reset();
      } catch (error) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });
  return (
    <Card>
      <CardHeader className="text-center font-bold text-2xl">
        Add Category
      </CardHeader>
      <CardContent>
        <form
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* category name */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter Category Name"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            {/* category description */}
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter Category Description"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          form="category-form"
          type="submit"
          className="w-full cursor-pointer bg-blue-400 hover:bg-blue-600"
        >
          Add Category
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddCategoryCard;
