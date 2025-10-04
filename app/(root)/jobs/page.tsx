import JobCard from "@/components/layout/cards/JobCard";
import JobsFilter from "@/components/layout/filters/JobFilter";
import Pagination from "@/components/layout/Pagination";
import {
  fetchCountries,
  fetchJobs,
  fetchLocation,
} from "@/lib/actions/job.action";
import { generateMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Jobs",
  description:
    "Discover programming and tech jobs worldwide with location and category filters.",
});

const PAGE_SIZE = 10;

const Page = async ({ searchParams }: RouteParams) => {
  const { query, location, page } = await searchParams;
  const parsedPage = Number(page) || 1;

  // Fetch filters & location concurrently
  const [userLocation, countries] = await Promise.all([
    fetchLocation(),
    fetchCountries(),
  ]);

  // Fetch jobs (manual pagination inside)
  const { jobs, isNext } = await fetchJobs({
    query: query || location ? `${query ?? ""} ${location ?? ""}`.trim() : "",
    location,
    page: parsedPage,
    pageSize: PAGE_SIZE,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="flex">
        <JobsFilter countriesList={countries} usersCountry={userLocation} />
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {jobs?.length > 0 ? (
          jobs.map((job: Job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again later.
          </div>
        )}
      </section>

      {jobs?.length > 0 && <Pagination page={parsedPage} isNext={isNext} />}
    </>
  );
};

export default Page;
