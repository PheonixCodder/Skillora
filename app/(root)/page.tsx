import Link from "next/link";

// import { getQuestions } from "@/lib/actions/question.action";

import CommonFilter from "@/components/layout/filters/CommonFilter";
import HomeFilter from "@/components/layout/filters/HomeFilter";
// import Pagination from "@/components/layout/Pagination";
import LocalSearch from "@/components/layout/search/LocalSearch";
import { Button } from "@/components/ui/button";
// import DataRenderer from "@/components/ui/DataRenderer";

import { HomePageFilters } from "@/constants/filters";
import { ROUTES } from "@/constants/routes";
// import { STATES } from "@/constants/states";
import QuestionCard from "@/components/layout/cards/QuestionCard";
import { SearchParams } from "@/types/global";

// const test = async () => {
//   try {
//     const validatedUrl = await ImageUrlSchema.safeParseAsync({
//       imageUrl: "https://mongoosejs.com/",
//     });
//     if (!validatedUrl.success)
//       throw new ValidationError(validatedUrl.error.flatten().fieldErrors);

//     return validatedUrl;
//   } catch (error) {
//     return handleError(error);
//   }
// };

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const { page, pageSize, query, filter } = await searchParams;
  const data = {
    questions: [
      {
        _id: "1",
        title: "What is the best way to learn programming?",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quae.",
        upvotes: 10,
        downvotes: 5,
        views: 100,
        answers: 5,
        tags: [
          {
            _id: "1",
            name: "javascript",
          },
          {
            _id: "2",
            name: "node",
          },
        ],
        author: {
          _id: "1",
          name: "John Doe",
          username: "johndoe",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "2",
        title: "What is the best way to learn programming?",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quae.",
        upvotes: 10,
        downvotes: 5,
        views: 100,
        answers: 5,
        tags: [
          {
            _id: "1",
            name: "javascript",
          },
          {
            _id: "2",
            name: "node",
          },
        ],
        author: {
          _id: "1",
          name: "John Doe",
          username: "johndoe",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "3",
        title: "What is the best way to learn programming?",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quae.",
        upvotes: 10,
        downvotes: 5,
        views: 100,
        answers: 5,
        tags: [
          {
            _id: "1",
            name: "javascript",
          },
          {
            _id: "2",
            name: "node",
          },
        ],
        author: {
          _id: "1",
          name: "John Doe",
          username: "johndoe",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    isNext: false,
  };

  // const { success, data, error } = await getQuestions({
  //   page: Number(page) || 1,
  //   pageSize: Number(pageSize) || 10,
  //   query: query || "",
  //   filter: filter || "",
  // });

  const { questions, isNext } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button className="primary-gradient !text-light-900 min-h-11 px-4 py-3" asChild>
          <Link href={ROUTES.ASK_A_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          className="flex-1"
          route={ROUTES.HOME}
        />

        <CommonFilter
          filters={HomePageFilters}
          otherClasses=" min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex max-sm:self-end"
        />
      </section>
      {/*   */}
      <HomeFilter />
      <div className="my-5 flex flex-col gap-5">
        {questions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
      {/*  */}
      {/* {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Something went wrong"}
          </p>
        </div>
      )} */}
      {/* <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={STATES.EMPTY_QUESTION}
        render={(questions) =>
          questions.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))
        }
      /> */}

      {/* <Pagination page={page} isNext={isNext || false} /> */}
    </>
  );
}
