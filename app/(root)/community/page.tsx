import UserCard from "@/components/layout/cards/UserCard";
import DataRenderer from "@/components/ui/DataRenderer";
import CommonFilter from "@/components/layout/filters/CommonFilter";
import Pagination from "@/components/layout/Pagination";
import LocalSearch from "@/components/layout/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { ROUTES } from "@/constants/routes";
import { STATES } from "@/constants/states";
import { getUsers } from "@/lib/actions/user.action";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Community",
  description:
    "Discover different programming questions and answers with recommendations from the community.",
})

const Community = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { users, isNext } = data || {};

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COMMUNITIES}
          iconPosition="left"
          imgSrc="/icons/search.svg"
          placeholder="There are some great devs here!"
          className="flex-1"
        />

        <CommonFilter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={users}
        empty={STATES.EMPTY_USERS}
        render={(users) => (
          <div className="mt-12 flex flex-wrap gap-5">
            {users.map((user) => (
              <UserCard key={user._id} {...user} />
            ))}
          </div>
        )}
      />

      <Pagination page={page} isNext={isNext || false} />
    </div>
  );
};

export default Community;