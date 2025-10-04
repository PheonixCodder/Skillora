import { NextResponse } from "next/server";
import OpenAI from "openai";

import { auth } from "@/lib/auth";
import handleError from "@/lib/handlers/error";
import { UnauthorizedError, ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validations";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
    defaultHeaders: {
    "X-Title": "Skillora", // Optional. Site title for rankings on openrouter.ai.
  },

},);

// 🎯 Use Fast Free from OpenRouter
const MODEL = "openai/gpt-oss-20b:free";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) throw new UnauthorizedError();

  try {
    const { question, content, userAnswer } = await req.json();

    const validatedData = AIAnswerSchema.safeParse({
      question,
      content,
      userAnswer,
    });
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    // 🔍 Call OpenRouter with your exact prompt/system config
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `
            You're an expert, friendly assistant who crafts clear, engaging, and concise answers in markdown.
            - Write as if you're helping a curious peer—be approachable, not robotic.
            - Use markdown for structure: headings, lists, code blocks, and emphasis where it helps understanding.
            - For code, use short, lowercase language tags (e.g., 'js', 'py', 'ts', 'html', 'css').
            - If the question is ambiguous, clarify assumptions and focus on practical, actionable info.
            - If you reference recent events or facts, be specific and cite sources if possible.
            - Never invent facts—if unsure, say so briefly.
            - 🚨 Your answer MUST be at most 1000 characters. Prioritize clarity and usefulness over length.
          `,
        },
        {
          role: "user",
          content: `
            Someone asked: "${question}"

            Here's extra context to help you answer:
            ---
            ${content}
            ---

            The user also suggested this answer:
            ---
            ${userAnswer}
            ---

            🎯 Your job:
            - If the user's answer is correct and complete, polish it for clarity and add any helpful details.
            - If it's incomplete or has mistakes, gently correct and improve it.
            - If it's missing, write a concise, helpful answer from scratch.
            - Always keep it human, practical, and easy to read.

            Respond in markdown only. No preambles or closing remarks—just the answer.
            🚨 Do not exceed 1000 characters.
          `,
        },
      ],
    });

    const text = completion.choices[0].message?.content || "";

    // Token + cost (if metadata available from OpenRouter)
    const usage = completion.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };

    return NextResponse.json(
      {
        success: true,
        data: {
          text,
          tokens: {
            promptTokens: usage.prompt_tokens,
            completionTokens: usage.completion_tokens,
            totalTokens: usage.total_tokens,
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
