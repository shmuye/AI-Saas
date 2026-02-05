import { Button } from "@/components/ui/button"
import Link from "next/link"

const LandingPage = () => {
  return (
    <div>
        <Link href='/sign-in'>
           <Button>Login</Button>
        </Link>
        <Link href='/sign-up'>
           <Button>Sign up</Button>
        </Link>
    </div>
  )
}

export default LandingPage