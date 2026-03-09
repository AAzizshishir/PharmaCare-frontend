"use client";

import z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldError, FieldGroup } from "./ui/field";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CategoryTypes } from "./../types/category.type";
import { postMedicineBySeller } from "@/app/actions/medicine.actions";

const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  brandName: z.string().min(3, "Brand name is required"),
  imageUrl: z.string().min(1, "Image is required"),
  price: z.number().min(1, "Price is required and must be greater than 0"),
  stock: z.number().min(1, "Stock is required and must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  description: z.string().min(20, "Description is required"),
});

const AddMedicine = ({
  categories,
}: {
  categories: { data: CategoryTypes[] };
}) => {
  const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  // upload image to imgbb and return the url
  const uploadToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?expiration=600&key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("ImgBB upload error:", error);
      toast.error("Failed to upload image. Please try again.");
      throw error;
    }
  };

  const form = useForm({
    defaultValues: {
      name: "",
      brandName: "",
      imageUrl: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding Medicine");

      console.log(value);
      try {
        const { data } = await postMedicineBySeller({ value });
        if (data.error) {
          toast.error(data.message, { id: toastId });
          return;
        }

        toast.success("Medicine Added Successfully", { id: toastId });
        form.reset();
      } catch (error) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Medicine</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="addMedicine-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter Medicine Name"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Brand Name */}
            <form.Field
              name="brandName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter Medicine Brand Name"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* upload image */}
            <form.Field
              name="imageUrl"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <Input
                      type="file"
                      id={field.name}
                      name={field.name}
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        try {
                          const url = await uploadToImgBB(file);
                          field.handleChange(url);
                        } catch (error) {
                          // Error is already handled in uploadToImgBB with toast
                          // Reset the input
                          e.target.value = "";
                        }
                      }}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Price */}
            <form.Field
              name="price"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      defaultValue={field.state.value}
                      placeholder="Enter Price"
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            {/* Stock */}
            <form.Field
              name="stock"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      defaultValue={field.state.value}
                      placeholder="Enter Stock"
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            {/* Category */}
            <form.Field
              name="categoryId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 "
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.data.map((category: CategoryTypes) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Description */}
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter Description"
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={4}
                      className="border rounded p-2 w-full"
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
          form="addMedicine-form"
          type="submit"
          className="w-full cursor-pointer bg-blue-400 hover:bg-blue-500"
        >
          Add Medicine
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddMedicine;
