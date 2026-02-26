import ReviewCard from "@/components/review-card";
import { ReviewCardProps } from "@/types";
import { cookies } from "next/headers";
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const MyReviews = async () => {
  const cookieStore = await cookies();
  const res = await fetch(`${PUBLIC_API_URL}/api/review`, {
    method: "GET",
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  const data = await res.json();
  const reviews = data.data;

  return (
    <div>
      {reviews.map((review: ReviewCardProps) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default MyReviews;
