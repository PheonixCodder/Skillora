import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/lib/auth";
import QuestionForm from "@/components/layout/forms/QuestionForm";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Ask a question",
  description:
    "Discover different programming questions and answers with recommendations from the community.",
})

const AskQuestion = async () => {
  const session = await auth();

  if (!session) return redirect("/sign-in");

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <QuestionForm isEdit={false} />
      </div>
    </>
  );
};

export default AskQuestion;