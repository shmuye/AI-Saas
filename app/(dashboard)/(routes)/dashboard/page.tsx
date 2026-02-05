
import { UserButton } from "@clerk/nextjs"
const DashboardPage = () => {
  return (
    <div>
        DashboardPage
        <UserButton afterSwitchSessionUrl="/"/>
    </div>
  )
}

export default DashboardPage