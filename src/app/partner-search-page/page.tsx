import SearchPageComponent from "@/components/partner-search-page/SearchPageComponent";
import { Suspense } from "react";

const PartnerSearchPage: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPageComponent />
    </Suspense>
  );
};
export default PartnerSearchPage;

const Loading = () => {
  return <>Loading...</>;
};
