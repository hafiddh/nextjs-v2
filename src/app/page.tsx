import GetFromAPI from "@/components/GetFromAPI"
import Navbar from "@/components/Navbar"
import User from "@/components/User"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <>
      <Navbar />
      <h1>Hello World</h1>

      <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      {JSON.stringify(session)}

      {/* <h2>GET DATA FROM OUTSIDE</h2>
      <GetFromAPI /> */}
    </>
  )
}
