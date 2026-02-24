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
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { Button } from "./ui/button";
import { MedicineDataType, medicineService } from "@/services/medicine.service";
import { CategoryTypes } from "@/types";
import { Label } from "./ui/label";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(1, "Price is required"),
  stock: z.number().min(1, "Stock is required"),
  categoryId: z.string(),
});

const EditMedicineCard = ({
  id,
  categories,
  medicine,
}: {
  id: string;
  categories: { data: CategoryTypes[] };
  medicine: { data: MedicineDataType };
}) => {
  console.log(medicine?.data.name);
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
      const toastId = toast.loading("Editing Medicine");

      console.log(value);
      try {
        const { data, error } = await medicineService.editMedicine({
          id,
          value,
        });
        console.log(data);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Medicine Edited Successfully", { id: toastId });
      } catch (error) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Medicine</CardTitle>
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
                    <Label>Medicine Name</Label>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={medicine?.data.name}
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
                    <Label>Medicine Description</Label>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      defaultValue={medicine.data.description}
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
                    <Label>Medicine Price</Label>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      defaultValue={medicine.data.price}
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
                    <Label>Medicine Stock</Label>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      defaultValue={medicine.data.stock}
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
                    <Label>Medicine Category</Label>
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
                      {categories?.data.map((category: CategoryTypes) => (
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
          Edit Medicine
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditMedicineCard;
