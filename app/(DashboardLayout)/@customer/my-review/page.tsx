import { getCustomerReviews } from "@/app/actions/review.actions";
import ReviewCard from "@/components/review-card";
import { ReviewCardProps } from "@/types";

const MyReviews = async () => {
  const data = await getCustomerReviews();
  const reviews = data?.data;

  return (
    <div className="container mx-auto">
      {reviews && reviews.length > 0 ? (
        <div>
          {reviews.map((review: ReviewCardProps) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">
          Your Don't Give Any Reviews.
        </p>
      )}
    </div>
  );
};

export default MyReviews;
