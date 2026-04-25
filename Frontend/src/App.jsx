import { useState } from 'react'
import Prism from "prismjs"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism-tomorrow.css"


import Editor from "react-simple-code-editor"

const CodeEditor = Editor.default || Editor

import { default as ReactMarkdown } from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"


import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)

  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)

  async function reviewCode() {
    try {
      setLoading(true)

      const response = await axios.post(
        'http://localhost:3000/ai/get-review',
        { code }
      )

      console.log("API:", response.data)

      setReview(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      )

    } catch (err) {
      console.error(err)
      setReview("Error fetching review")
    } finally {
      setLoading(false)
    }
  }

  console.log("Editor:", Editor)
  console.log("ReactMarkdown:", ReactMarkdown)

  return (
    <main>
      <div className="left">
        <div className="code">
          <CodeEditor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
              backgroundColor: "#0c0c0c",
              color: "white"
            }}
          />
        </div>

        <div onClick={reviewCode} className="review">
          {loading ? "Analyzing..." : "Review"}
        </div>
      </div>

      <div className="right">
        {review ? (
          <ReactMarkdown

          rehypePlugins={[rehypeHighlight]}


          >{review}
          </ReactMarkdown>
        ) : (
          <p style={{ color: "white" }}>Click "Review" to analyze code</p>
        )}
      </div>
    </main>
  )
}

export default App