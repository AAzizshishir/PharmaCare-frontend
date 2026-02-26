"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldError, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { useSearchParams } from "next/navigation";
import { reviewService } from "@/services/review.service";

const formSchema = z.object({
  rating: z.number().min(1, "Rating minimum 1").max(5, "Rating maximum 5"),
  comment: z.string().min(5, "Comment cannot be empty, minimum 5 characters"),
});

const AddReviewCard = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const medicineId = searchParams.get("medicineId");
  console.log(orderId, medicineId);
  const form = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding Review");
      try {
        const body = {
          medicineId,
          orderId,
          rating: value.rating,
          comment: value.comment,
        };
        const res = await reviewService.addReview(body);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Review Added Successfully", { id: toastId });
      } catch (error) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle>Add Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="addReview-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Ratings */}
            <form.Field
              name="rating"
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
                      placeholder="Enter Rating (1 - 5)"
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

            {/* Description */}
            <form.Field
              name="comment"
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
                      placeholder="Enter Your Comment"
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
          form="addReview-form"
          type="submit"
          className="w-full cursor-pointer bg-blue-400 hover:bg-blue-600"
        >
          Add Review
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddReviewCard;
