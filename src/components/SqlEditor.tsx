import {useEffect, useRef, useState} from "react";
import {basicSetup, EditorView} from "codemirror";
import {sql} from "@codemirror/lang-sql";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./../styles/sqlPage/SqlEditor.css";
import "./../styles/sqlPage/Editor.css";
import {FaRobot} from "react-icons/fa";
import {GoRepoTemplate} from "react-icons/go";
import {AiOutlinePlus} from "react-icons/ai";
import {GoogleGenerativeAI} from "@google/generative-ai";

interface SqlEditorProps {
  onSubmit: (query: string) => void;
  query: string;
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash-8b"});

const SqlEditor = ({onSubmit, query}: SqlEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  const [selectedText, setSelectedText] = useState<string>("");
  const [isAiPaneOpen, setIsAiPaneOpen] = useState(false);
  const [isTemplatePaneOpen, setIsTemplatePaneOpen] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [aiSQL, setAiSQL] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<string[]>([]);
  const [aiQueries, setAiQueries] = useState<string[]>([]);

  useEffect(() => {
    const savedTemplates = localStorage.getItem("sqlTemplates");
    if (savedTemplates) setTemplates(JSON.parse(savedTemplates));

    const savedAiQueries = localStorage.getItem("aiQueries");
    if (savedAiQueries) setAiQueries(JSON.parse(savedAiQueries));
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const view = new EditorView({
        doc: query,
        extensions: [
          basicSetup,
          sql(),
          EditorView.updateListener.of((update) => {
            if (update.selectionSet) {
              const selection = update.state.selection.main;
              const selectedText = update.state.doc.sliceString(
                  selection.from,
                  selection.to,
              );
              setSelectedText(selectedText);
            }
          }),
        ],
        parent: editorRef.current,
      });

      viewRef.current = view;

      return () => view.destroy();
    }
  }, [query]);

  const handleSubmit = () => {
    if (viewRef.current) {
      const query =
          selectedText.trim() || viewRef.current.state.doc.toString().trim();
      onSubmit(query);
    }
  };

  const handleAiSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const scenarioPrompt = `
        Generate a SQL query for:
        "${prompt}".
        Return only the SQL query, no explanations.
      `;

      const result = await model.generateContent(scenarioPrompt);
      const res_ai = await result.response;
      const text = res_ai
          .text()
          .replace(/```sql/g, "")
          .replace(/```/g, "")
          .trim();

      if (text) {
        setAiSQL(text);

        if (!aiQueries.includes(text)) {
          const newQueries = [...aiQueries, text];
          setAiQueries(newQueries);
          localStorage.setItem("aiQueries", JSON.stringify(newQueries));
        }
      }
    } catch (error) {
      console.error("Failed to generate SQL:", error);
      alert("Failed to generate SQL. Check your API key and connection.");
    } finally {
      setLoading(false);
    }
  };

  const insertSQL = (query: string) => {
    if (viewRef.current) {
      const cursorPos = viewRef.current.state.selection.main.head;
      const transaction = viewRef.current.state.update({
        changes: {from: cursorPos, to: cursorPos, insert: query},
      });
      viewRef.current.dispatch(transaction);
    }
  };

  const saveTemplate = () => {
    if (!selectedText.trim() || templates.includes(selectedText.trim())) return;

    const newTemplates = [...templates, selectedText.trim()];
    setTemplates(newTemplates);
    localStorage.setItem("sqlTemplates", JSON.stringify(newTemplates));
  };

  return (
      <div className="sql-editor">
        <div className="editor-navbar">
          <h3 className="editor-title">{
            location
                .pathname
                .split("/")
                .slice(-1)[0]
                .replace(/-/g, " ")
                .toUpperCase()
          }
          </h3>
          <div className="editor-navbar-actions">
            <div className="navbar-actions">
              <ul>
                <li onClick={() => setIsAiPaneOpen(!isAiPaneOpen)}>
                  <FaRobot/>
                </li>
                <li onClick={() => setIsTemplatePaneOpen(!isTemplatePaneOpen)}>
                  <GoRepoTemplate/>
                </li>
              </ul>
            </div>
            <button className="editor-submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>

        <div className="editor-main" ref={editorRef}></div>

        <SlidingPane
            isOpen={isAiPaneOpen}
            from="right"
            width="35%"
            onRequestClose={() => setIsAiPaneOpen(false)}
            title="AI SQL Generator"
        >
          <div className="ai-bot-section">
            <input
                type="text"
                placeholder="Enter SQL scenario"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={handleAiSubmit} disabled={loading}>
              {loading ? "Generating..." : "Generate SQL"}
            </button>

            {aiSQL && (
                <div className="ai-output" onClick={() => insertSQL(aiSQL)}>
                  <pre>{aiSQL}</pre>
                </div>
            )}
          </div>

          <div className="history-section">
            <h4>History</h4>
            {aiQueries.length === 0 ? (
                <p>No history available.</p>
            ) : (
                <ul className="history-list">
                  {aiQueries.map((query, index) => (
                      <li
                          key={index}
                          className="history-item"
                          onClick={() => insertSQL(query)} // Insert on click
                      >
                        <pre>{query}</pre>
                      </li>
                  ))}
                </ul>
            )}
          </div>
        </SlidingPane>

        <SlidingPane
            isOpen={isTemplatePaneOpen}
            from="right"
            width="30%"
            onRequestClose={() => setIsTemplatePaneOpen(false)}
            title="SQL Templates"
        >
          <div className="template-section">
            <button onClick={saveTemplate} disabled={!selectedText.trim()}>
              <AiOutlinePlus/> Save Selected
            </button>

            <ul className="template-list">
              {templates.length === 0 ? (
                  <p>No templates saved yet.</p>
              ) : (
                  templates.map((template, index) => (
                      <li
                          key={index}
                          onClick={() => insertSQL(template)} // Insert on click
                          className="template-item"
                      >
                        {template}
                      </li>
                  ))
              )}
            </ul>
          </div>
        </SlidingPane>
      </div>
  );
};

export default SqlEditor;
