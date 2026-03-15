import { getMedicineById } from "@/app/actions/medicine.actions";
import { getMedicineReviews } from "@/app/actions/review.actions";
import MedicineDetailsCard from "@/components/medicine-details-card";
import ReviewCard from "@/components/review-card";
import { ReviewCardProps } from "@/types";

const MedicinePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const medicine = await getMedicineById(id);
  const medicineDetails = medicine.data;

  const medicineReviews = await getMedicineReviews(id);
  const medicineReviewsData = medicineReviews?.data;

  return (
    <div>
      <MedicineDetailsCard medicineDetails={medicineDetails} />
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
            This medicine has no review.
          </p>
        )}
      </div>
    </div>
  );
};

export default MedicinePage;
