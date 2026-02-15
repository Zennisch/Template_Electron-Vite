import ZButton from "@renderer/components/primary/ZButton"
import { useNavigate } from "react-router-dom"

const ComponentsPage = () => {
  const navigation = useNavigate()

  return <ZButton onClick={() => navigation("/")}>Home</ZButton>
}

export default ComponentsPage
