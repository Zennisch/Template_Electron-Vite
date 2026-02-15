import ZButton from "@renderer/components/primary/ZButton"
import { useNavigate } from "react-router-dom"

const ComponentsPage = () => {
  const navigation = useNavigate()

  return (
   <div className="w-full h-full flex justify-center items-center bg-slate-400">
      <ZButton onClick={() => navigation("/")}>Home</ZButton>
    </div>
  )
}

export default ComponentsPage
