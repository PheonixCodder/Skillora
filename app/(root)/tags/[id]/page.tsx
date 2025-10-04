import QuestionCard from "@/components/layout/cards/QuestionCard";
import Pagination from "@/components/layout/Pagination";
import LocalSearch from "@/components/layout/search/LocalSearch";
import DataRenderer from "@/components/ui/DataRenderer";
import { ROUTES } from "@/constants/routes";
import { STATES } from "@/constants/states";
import { getTagQuestions } from "@/lib/actions/tag.action";
import { Metadata } from "next";

// ✅ Step 1: Use generateMetadata that calls getTagQuestions (or a light version)
export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { id } = await params;

  // Lightweight fetch only to get the tag name
  const { success, data } = await getTagQuestions({
    tagId: id,
    page: 1,
    pageSize: 1,
  });

  const tagName = success ? data?.tag?.name : "Tag";

  return {
    title: tagName,
    description: `Explore questions tagged with ${tagName}.`,
    twitter: {
      card: "summary_large_image",
      title: tagName,
      description: `Explore questions tagged with ${tagName}.`,
    },
  };
}

// ✅ Step 2: Main page using the same cached call
const Page = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, query } = await searchParams;

  // Same call used above — will be cached by Next.js automatically
  const { success, data, error } = await getTagQuestions({
    tagId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
  });

  const { tag, questions, isNext } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">{tag?.name}</h1>
      </section>

      <section className="mt-11">
        <LocalSearch
          route={ROUTES.TAG(id)}
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          className="flex-1"
        />
      </section>

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

      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default Page;
