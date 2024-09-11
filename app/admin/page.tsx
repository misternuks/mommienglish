import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
export default async function AdminDashboard() {
  // Check if the user is authenticated and is an admin
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // If not authenticated, redirect to the sign-in page
    redirect("/auth/signin");
  }

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>This is the protected admin area. You can manage members content here.</p>
    </div>
  );
}
