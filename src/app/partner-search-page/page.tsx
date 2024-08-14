import SearchPageComponent from "@/components/partner-search-page/SearchPageComponent";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PartnerSearchPage: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPageComponent />
    </Suspense>
  );
};
export default PartnerSearchPage;

const Loading = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#222C60] to-[#1B1E27] min-h-[28rem] flex items-center justify-center text-center">
        <div className="md:max-w-[58rem] mx-auto px-4 space-y-12 w-full">
          <div className="space-y-2 text-sm">
            <div className="text-[#E6C7FF] uppercase text-base md:text-[20px]">
              Saúde LGBTI+
            </div>
            <h2 className="heading-bold font-semibold text-[34px] leading-[40px] sm:text-[38px] sm:leading-[46px] md:font-bold md:text-[48px] md:leading-[55px] mx-auto text-white">
              Busque profissionais inclusivos
            </h2>
          </div>
          <div className="mb-8 grid grid-cols-1 gap-2">
            <Skeleton className="w-full h-[46px] bg-gray-500" />
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 w-full flex items-center justify-between">
          <div className="bg-[#7E34D9] max-w-[900px] w-full min-h-[8px]" />
          <div className="bg-[#0074A6] max-w-[900px] w-full min-h-[8px]" />
          <div className="bg-[#79A06E] max-w-[900px] w-full min-h-[8px]" />
          <div className="bg-[#FFB101] max-w-[900px] w-full min-h-[8px]" />
          <div className="bg-[#FF6001] max-w-[900px] w-full min-h-[8px]" />
          <div className="bg-[#CF1616] max-w-[900px] w-full min-h-[8px]" />
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="sm:container px-5 mx-auto mt-[2rem] md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Skeleton className="w-full h-[318px] bg-gray-500" />
            <Skeleton className="w-full h-[318px] bg-gray-500" />
            <Skeleton className="w-full h-[318px] bg-gray-500" />
            <Skeleton className="w-full h-[318px] bg-gray-500" />
            <Skeleton className="w-full h-[318px] bg-gray-500" />
            <Skeleton className="w-full h-[318px] bg-gray-500" />
          </div>
        </div>
      </section>
    </>
  );
};
