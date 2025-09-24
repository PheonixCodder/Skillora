import Link from "next/link";

// import { getHotQuestions } from "@/lib/actions/question.action";
// import { getPopularTags } from "@/lib/actions/tag.action";

import TagCard from "../cards/TagCard";

import { ROUTES } from "@/constants/routes";

async function RightSidebar() {
  // const [hotQuestions, popularTags] = await Promise.all([
  //   getHotQuestions(),
  //   getPopularTags(),
  // ]);
  const hotQuestions = {
    success: true,
    data: [
      {
        _id: "1",
        title: "What is the best way to learn programming?",
        upvotes: 10,
        downvotes: 5,
        views: 100,
        answers: 5,
        tags: ["javascript", "programming"],
        author: "John Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "2",
        title: "What is the best way to learn programming?",
        upvotes: 10,
        downvotes: 5,
        views: 100,
        answers: 5,
        tags: ["javascript", "programming"],
        author: "John Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "3",
        title: "What is the best way to learn programming?",
        upvotes: 10,
        downvotes: 5,
        views: 100,
        answers: 5,
        tags: ["javascript", "programming"],
        author: "John Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  const popularTags = { success: true, data: [
    {
      _id: "1",
      name: "javascript",
      count: 10,
    },
    {
      _id: "2",
      name: "react",
      count: 5,
    },
    {
      _id: "3",
      name: "nextjs",
      count: 3,
    },
    {
      _id: "4",
      name: "nodejs",
      count: 2,
    },
    {
      _id: "5",
      name: "expressjs",
      count: 1,
    },
    {
      _id: "6",
      name: "mongodb",
      count: 1,
    },
    {
      _id: "7",
      name: "tailwindcss",
      count: 1,
    },
  ] };

  const hotQuestionsSuccess = hotQuestions.success;
  const popularTagsSuccess = popularTags.success;

  return (
    <aside className="no-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-full max-w-72 flex-col gap-6 overflow-y-auto border-l p-6 pt-36 max-xl:hidden dark:shadow-none">
      <div>
        <h2 className="h2-bold text-dark200_light900">Top Question</h2>

        <div className="mt-7 flex w-full flex-col gap-4 px-4 py-2 pr-0">
          {hotQuestionsSuccess &&
            hotQuestions.data &&
            hotQuestions.data.map((question) => (
              <Link
                href={ROUTES.QUESTION(question._id)}
                key={question._id}
                className="rounded-2 group relative flex items-center justify-between gap-4"
              >
                <p className="body-medium text-dark500_light700">{question.title}</p>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={"/icons/chevron-right.svg"}
                  width={24}
                  height={24}
                  className="invert-colors size-6 transition-transform duration-200 group-hover:translate-x-1"
                  alt="Chevron Right"
                />
              </Link>
            ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="h2-bold text-dark200_light900">Popular Tags</h2>

        <div className="mt-7 flex flex-col gap-4 px-4 py-2 pr-0">
          {popularTagsSuccess &&
            popularTags.data &&
            popularTags.data.map((tag) => {
              return (
                <TagCard
                  key={tag._id}
                  _id={tag._id}
                  name={tag.name}
                  // questions={tag.questions}
                  showCount
                  compact
                />
              );
            })}
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
