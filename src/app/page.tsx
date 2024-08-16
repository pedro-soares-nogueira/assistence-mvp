import React, { Suspense } from "react";
import { Loading } from "@/components/partner-search-page/Loading";
import SearchPageComponent from "@/components/partner-search-page/SearchPageComponent";

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPageComponent />
    </Suspense>
  );
};

export default Home;
