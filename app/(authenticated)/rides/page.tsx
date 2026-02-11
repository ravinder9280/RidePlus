import RideSearchList from "./components/ride-search-list";
import RideSearchBar from "./components/ride-search-bar";
import RideFiltersMobile from "./components/ride-filters-mobile";
import RideFiltersDesktop from "./components/ride-filters-desktop";

export default async function RidesPage() {
  return (
    <div className="flex-grow max-w-7xl mx-auto min-h-screen">
      <div
        className="bg-background/55 backdrop-blur-md sticky py-4 z-50
            top-[5.2rem]"
      >
        <RideSearchBar />
        <RideFiltersMobile />
      </div>

      <div className="md:grid md:grid-cols-[300px_1fr] md:gap-6 md:mt-4">
        <div className="hidden md:block">
          <div className="sticky top-[12rem]">
            <RideFiltersDesktop />
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <RideSearchList />
        </div>
      </div>
    </div>
  );
}
