import { ReviewCardProps } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }: { review: ReviewCardProps }) => {
  const { customer, medicines, rating, comment, createdAt } = review;
  console.log(review);
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
    </Card>
  );
};

export default ReviewCard;
