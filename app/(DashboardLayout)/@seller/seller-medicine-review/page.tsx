import { getSellerReviews } from "@/app/actions/review.actions";
import ReviewCard from "@/components/layout-card/review-card";
import { ReviewCardProps } from "@/types";

const SellerMedicineReviewPage = async () => {
  const result = await getSellerReviews();
  const medicineReviewsData = result?.data;
  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-2xl font-medium text-center">Review</h2>
      {medicineReviewsData && medicineReviewsData.length > 0 ? (
        <div>
          {medicineReviewsData.map((review: ReviewCardProps) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">
          No reviews any of Medicine
        </p>
      )}
    </div>
  );
};

export default SellerMedicineReviewPage;
