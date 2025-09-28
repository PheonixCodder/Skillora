import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import QuestionForm from "@/components/layout/forms/QuestionForm";

async function AskAQuestion() {
  const session = await auth();


  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>

      <div className="mt-9 flex flex-col gap-9 md:flex-row">
        <div className="flex w-full flex-1 flex-col gap-9">
          {/* <QuestionForm isEdit={false} /> */}
        </div>
      </div>
    </>
  );
}

export default AskAQuestion;
