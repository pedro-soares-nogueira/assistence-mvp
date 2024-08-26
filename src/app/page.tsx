import React, { Suspense } from "react";
import { Loading } from "@/components/partner-search-page/Loading";
import SearchPageComponent from "@/components/partner-search-page/SearchPageComponent";
import { SessionProvider } from "next-auth/react";

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SessionProvider>
        <SearchPageComponent />
      </SessionProvider>
    </Suspense>
  );
};

export default Home;
