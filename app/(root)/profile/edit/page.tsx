import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import ProfileForm from "@/components/layout/forms/ProfileForm";
import { ROUTES } from "@/constants/routes";
import { getUser } from "@/lib/actions/user.action";
import { Metadata } from "next";

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { id } = await params;

  const { data, error } = await getUser({ userId: id })
  const user = data?.user

  if (!user) return { title: "User not found", description: error?.message };

  const bio = user.bio ? user.bio.slice(0, 100) : "";
  return {
    title: `Editing ${user.name} Profile`,
    description: bio,
    twitter: {
      card: "summary_large_image",
      title: user.name,
      description: bio,
    },
  };
}

const Page = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.SIGN_IN);

  const { success, data } = await getUser({ userId: session.user.id });
  if (!success) redirect(ROUTES.SIGN_IN);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <ProfileForm user={data?.user as User} />
    </>
  );
};

export default Page;