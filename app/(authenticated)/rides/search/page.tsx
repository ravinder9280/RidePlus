import RideSearchForm from "@/components/rides/search/ride-search-form";
import React from "react";

const RideSearchPage = () => {
  return (
    <div className="min-h-screen p-1 py-4  sm:p-2 md:p-4 lg:p-6 ">
      <div className="text-center flex items-center justify-center mb-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold">Search for Rides</h1>
          <p className="mt-2 text-lg md:text-xl text-muted-foreground">
            Search for rides based on your journey information.
          </p>
        </div>
      </div>
      <RideSearchForm
        title="Ride Details"
        description="Fill in your journey information"
      />
    </div>
  );
};

export default RideSearchPage;
