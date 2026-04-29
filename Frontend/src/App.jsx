import { useState } from 'react'
import Editor from "@monaco-editor/react"

import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)

  const [language, setLanguage] = useState("javascript") 

  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)

  async function reviewCode() {
    try {
      setLoading(true)

      const res = await axios.post(
        'http://localhost:3000/ai/get-review',
        { code }
      )

      setReview(res.data)

    } catch (err) {
      console.error(err)
      setReview(" AI server busy. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>

      <div className="left">

       
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            margin: "10px",
            padding: "5px",
            borderRadius: "5px"
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <div className="code">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
          />
        </div>

          <button onClick={reviewCode} className="review">
         {loading ? "Analyzing..." : "Review"}
       </button>

     </div>

      <div className="right">
        {loading ? (
          <p style={{ color: "white" }}> Analyzing..</p>
        ) : review ? (
          <div className="markdown-body">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
           {review}
        </ReactMarkdown>
        </div>
        ) : (
          <p style={{ color: "white" }}>
            Click Review to analyze code
          </p>
        )}
      </div>

    </main>
  )
}

export default App