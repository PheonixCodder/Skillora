import QuestionCard from "@/components/layout/cards/QuestionCard";
import DataRenderer from "@/components/ui/DataRenderer";
import CommonFilter from "@/components/layout/filters/CommonFilter";
import Pagination from "@/components/layout/Pagination";
import LocalSearch from "@/components/layout/search/LocalSearch";
import { CollectionFilters } from "@/constants/filters";
import { ROUTES } from "@/constants/routes";
import { STATES } from "@/constants/states";
import { getSavedQuestions } from "@/lib/actions/collection.action";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";


export const metadata: Metadata = generateMetadata({
  title: "Saved Questions",
  description:
    "Discover different programming questions and answers with recommendations from the community.",
})

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Collections = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getSavedQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { collection, isNext } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COLLECTIONS}
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          className="flex-1"
        />

        <CommonFilter
          filters={CollectionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={collection}
        empty={STATES.EMPTY_QUESTION}
        render={(collection) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {collection.map((item) => (
              <QuestionCard key={item._id} question={item.question} />
            ))}
          </div>
        )}
      />

      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default Collections;