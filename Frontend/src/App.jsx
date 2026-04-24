import { useState ,useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import './App.css'

function App() {
   const [ count, setCount ] = useState(0)
  const [code, setCode] = useState(`function sum(){
  return 1+1;
}`)

 useEffect(() => {
    prism.highlightAll()
  }, [])

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
           style={{
           fontFamily: '"Fira Code", monospace',
            fontSize: 12,
            height: "100%",
           width: "100%",
           color: "#fff",              
           backgroundColor: "#0c0c0c"
           }}
          />
        </div>
        <div className="review">Review</div>
      </div>
      <div className="right"></div>
    </main>
  )
}

export default App