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
import { medicineService } from "@/services/medicine.service";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(1, "Price is required"),
  stock: z.number().min(1, "Stock is required"),
  categoryId: z.string(),
});

const AddMedicine = ({
  categories,
}: {
  categories: { data: CategoryTypes[] };
}) => {
  const form = useForm({
    defaultValues: {
      name: "",
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
        const { data, error } = await medicineService.postMedicine({ value });
        console.log(data);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Medicine Added Successfully", { id: toastId });
      } catch (error) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });
  return (
    <div>
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
              {/* Description */}
              <form.Field
                name="description"
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
                        placeholder="Enter Description"
                        onChange={(e) => field.handleChange(e.target.value)}
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
                        value={field.state.value}
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
                        value={field.state.value}
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
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            form="addMedicine-form"
            type="submit"
            className="w-full cursor-pointer bg-blue-400"
          >
            Add Medicine
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddMedicine;
