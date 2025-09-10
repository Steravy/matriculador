import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import SchoolsDashboard from "./schools"

export default async function SchoolsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect("/login")

  // TODO: Fetch schools from database
  // const schools = await getSchools(session.user.id)

  return <SchoolsDashboard />
}