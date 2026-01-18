import { useState } from "react"
import ZTextInput from "./components/primary/ZTextInput"

export default function ZTextInputTest() {
  const [text, setText] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!text) {
      setError("Vui lòng nhập thông tin!")
      // Reset error sau 2s để demo
      setTimeout(() => setError(""), 2000)
    } else {
      setError("")
      alert("Success: " + text)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-10">
      <ZTextInput
        label="Họ và tên"
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          if (error) setError("") // Xóa lỗi khi user bắt đầu gõ
        }}
        error={error}
      />

      <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Submit
      </button>
    </div>
  )
}
