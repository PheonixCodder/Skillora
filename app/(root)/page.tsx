import Link from "next/link";

import QuestionCard from "@/components/layout/cards/QuestionCard";
import CommonFilter from "@/components/layout/filters/CommonFilter";
import HomeFilter from "@/components/layout/filters/HomeFilter";
import Pagination from "@/components/layout/Pagination";
import LocalSearch from "@/components/layout/search/LocalSearch";
import { Button } from "@/components/ui/button";
import DataRenderer from "@/components/ui/DataRenderer";
import { HomePageFilters } from "@/constants/filters";
import { ROUTES } from "@/constants/routes";
import { STATES } from "@/constants/states";
import { getQuestions } from "@/lib/actions/question.action";
import { getAllTags } from "@/lib/actions/tag.action";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Home",
  description:
    "Discover different programming questions and answers with recommendations from the community.",
});

async function Home({ searchParams }: RouteParams) {
  

  const { page, pageSize, query, filter, tags } = await searchParams;

  const tagsArr = tags ? tags.split(",") : [];

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    tags: tagsArr,
    filter,
  });
  
  const tagsResponse: ActionResponse<{ _id: string; name: string }[]> = await getAllTags();
  const actionTags =
    tagsResponse.success && tagsResponse.data
      ? tagsResponse.data.map((tag: { _id: string; name: string }) => ({
          value: tag.name.toLowerCase(),
          label: tag.name,
        }))
      : [];

  const { questions, isNext } = data || {};

  return (
    <>
      <section className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient !text-light-900 min-h-[46px] px-4 py-3" asChild>
          <Link href={ROUTES.ASK_A_QUESTION} className="max-sm:w-full">
            Ask a Question
          </Link>
        </Button>
      </section>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.HOME}
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          iconPosition="left"
          className="flex-1"
        />

        <CommonFilter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </section>
      <HomeFilter tags={actionTags} />
      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={STATES.EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
      {questions && questions.length > 0 && <Pagination page={page} isNext={isNext || false} />}
    </>
  );
}

export default Home;
