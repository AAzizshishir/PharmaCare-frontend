import AddReviewCard from "@/components/layout-card/add-review-card";
import { Suspense } from "react";

const AddReview = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddReviewCard />
    </Suspense>
  );
};

export default AddReview;
