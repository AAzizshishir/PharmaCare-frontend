"use client";

import { AppSession, ReviewCardProps } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FaStar } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteReview } from "@/app/actions/review.actions";

const ReviewCard = ({ review }: { review: ReviewCardProps }) => {
  const { customer, medicines, rating, comment, createdAt } = review;

  const { data } = useSession();
  const session = data as AppSession | null;
  const role = session?.user.role;

  const router = useRouter();

  const handleDeleteReview = async (id: string) => {
    const toastId = toast.loading("Deleting Review");
    try {
      const { data, error } = await deleteReview(id);
      console.log(data);
      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }

      toast.success("Review Deleted Successfull", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  };
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <p>
              <strong>Customer Name: </strong>
              {customer.name}
            </p>
            <p className="my-2">
              <strong>Medicine Name: </strong>
              {medicines.name}
            </p>
          </div>
          <span className="text-yellow-500 flex">
            {Array.from({ length: rating }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{comment || "No comment provided."}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">
          Reviewed on {new Date(createdAt).toLocaleDateString()}
        </p>
      </CardFooter>

      <div className="flex justify-end mr-6">
        {role === "CUSTOMER" && (
          <Button
            onClick={() => handleDeleteReview(review.id)}
            className="bg-blue-400 hover:bg-blue-600 cursor-pointer"
          >
            Delete Review
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ReviewCard;
