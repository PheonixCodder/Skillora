import { FilterQuery } from "mongoose";

import {
  GetTagQuestionsSchema,
  GetTagQuestionsSchemaType,
  PaginatedSearchParamsSchema,
  PaginatedSearchParamsType,
} from "@/lib/validations";

import { action } from "../handlers/action";
import handleError from "../handlers/error";

import { Question, Tag } from "@/database";
import dbConnect from "../mongoose";

export const getTags = async (
  params: PaginatedSearchParamsType
): Promise<
  ActionResponse<{
    tags: Tag[];
    isNext: boolean;
  }>
> => {
  const validatedResults = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validatedResults instanceof Error) {
    return handleError(validatedResults) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter = "popular" } = validatedResults.params!;

  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Tag> = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "popular":
      sortCriteria = {
        questions: -1,
      };
      break;

    case "recent":
      sortCriteria = { createdAt: -1 };
      break;

    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;

    case "name":
      sortCriteria = { name: 1 };
      break;

    default:
      break;
  }

  try {
    const totalCount = await Tag.countDocuments(filterQuery);
    const tags = await Tag.find(filterQuery).sort(sortCriteria).skip(skip).limit(limit).lean();

    const isNext = totalCount > skip + limit;

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getTagQuestions = async (
  params: GetTagQuestionsSchemaType
): Promise<
  ActionResponse<{
    tag: Tag;
    questions: Question[];
    isNext: boolean;
  }>
> => {
  const validatedResults = await action({
    params,
    schema: GetTagQuestionsSchema,
  });

  if (validatedResults instanceof Error) {
    return handleError(validatedResults) as ErrorResponse;
  }

  const { tagId, page = 1, pageSize = 10, query } = validatedResults.params!;

  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  try {
    const tag = await Tag.findById(tagId);

    if (!tag) {
      throw new Error("Tag not found");
    }

    const filterQuery: FilterQuery<typeof Question> = {
      tags: { $in: [tagId] },
    };

    if (query) {
      filterQuery.title = { $regex: query, $options: "i" };
    }

    const totalQuestions = await Question.countDocuments(filterQuery);
    const questions = await Question.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .select("_id title views answers upvotes downvotes author createdAt")
      .populate([
        { path: "author", select: "name  image" },
        { path: "tags", select: "name" },
      ]);

    const isNext = totalQuestions > skip + limit;

    return {
      success: true,
      data: {
        tag: JSON.parse(JSON.stringify(tag)),
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getPopularTags = async (): Promise<
  ActionResponse<Pick<Tag, "_id" | "name" | "questions">[]>
> => {
  try {
    await dbConnect();
    const tags = await Tag.find({}).sort({ questions: -1 }).select("_id name questions").limit(5);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tags)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getAllTags = async () => {
  try {
    const tags = await Tag.find({}).select("_id name");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tags)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getTagsByName = async (names: Partial<Tag>[]) => {
  try {
    const tags = await Tag.find({ name: { $in: names } }).select("_id name");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tags)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
