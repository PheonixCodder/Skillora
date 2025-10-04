import TagCard from "@/components/layout/cards/TagCard";
import DataRenderer from "@/components/ui/DataRenderer";
import CommonFilter from "@/components/layout/filters/CommonFilter";
import Pagination from "@/components/layout/Pagination";
import LocalSearch from "@/components/layout/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { ROUTES } from "@/constants/routes";
import { STATES} from "@/constants/states";
import { getTags } from "@/lib/actions/tag.action";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Tags",
  description:
    "Discover different programming questions and answers with recommendations from the community.",
})

const Tags = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { tags, isNext } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.TAGS}
          imgSrc="/icons/search.svg"
          placeholder="Search tags..."
          className="flex-1"
        />

        <CommonFilter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={tags}
        empty={STATES.EMPTY_TAG}
        render={(tags) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {tags.map((tag) => (
              <TagCard key={tag._id} {...tag} />
            ))}
          </div>
        )}
      />

      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default Tags;