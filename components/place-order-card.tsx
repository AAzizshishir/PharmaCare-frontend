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
import { CartItem } from "@/types";
import { CreateOrder } from "@/app/actions/order.actions";

// ✅ Zod schema
const formSchema = z.object({
  shippingAddress: z.string().min(5, "Address must be at least 5 characters"),
});

const PlaceOrderCard = ({
  cart,
}: {
  cart: { id: string; items: CartItem[] };
}) => {
  const form = useForm({
    defaultValues: {
      shippingAddress: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Placing Order...");

      try {
        const payload = cart.items.map((item) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
        }));

        const body = {
          shippingAddress: value.shippingAddress,
          items: payload,
        };

        const res = await CreateOrder(body);

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
        } else {
          toast.success("Order placed successfully!", { id: toastId });
        }
        form.reset();
      } catch (error) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  const grandTotal = cart.items.reduce(
    (acc, item) => acc + Number(item.subtotal),
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Order</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Cart Summary */}
        <div className="space-y-3 mb-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border p-2 rounded"
            >
              <div>
                <p className="font-semibold">{item.medicine.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold">${item.subtotal}</p>
            </div>
          ))}
          <div className="text-right font-bold text-lg">
            Grand Total: ${grandTotal}
          </div>
        </div>
        {/* checkout form */}
        <form
          id="placeOrder-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Shipping Address */}
            <form.Field
              name="shippingAddress"
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
                      placeholder="Enter Shipping Address"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Payment Method */}
            <Field>
              <Input
                type="text"
                value="CASH ON DELIVERY"
                readOnly
                className="border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          form="placeOrder-form"
          type="submit"
          className="w-full cursor-pointer bg-blue-400 hover:bg-blue-600"
        >
          Confirm Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaceOrderCard;
