import { Button } from "@/components/ui/button"
import Link from "next/link"

const LandingPage = () => {
  return (
    <div className="mx-auto w-[80%] flex items-center justify-center h-40 gap-4">
      {/* Login button - gray outline */}
      <Link href="/sign-in">
        <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300 rounded-lg px-6 py-2 transition-colors">
          Login
        </Button>
      </Link>

      {/* Sign up button - darker gray to contrast */}
      <Link href="/sign-up">
        <Button className="bg-gray-300 text-gray-900 hover:bg-gray-400 border border-gray-300 rounded-lg px-6 py-2 transition-colors">
          Sign Up
        </Button>
      </Link>
    </div>
  )
}

export default LandingPage