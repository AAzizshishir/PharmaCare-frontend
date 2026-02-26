import ReviewCard from "@/components/review-card";
import { ReviewCardProps } from "@/types";
import { cookies } from "next/headers";
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const SellerMedicineReviewPage = async () => {
  const cookieStore = await cookies();
  const res = await fetch(`${PUBLIC_API_URL}/api/seller/review`, {
    next: { revalidate: 60 },
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  const data = await res.json();
  const medicineReviewsData = data?.data;
  console.log(data);
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
