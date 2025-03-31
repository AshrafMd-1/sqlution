import { useEffect, useRef, useState } from "react";
import { basicSetup, EditorView } from "codemirror";
import { sql } from "@codemirror/lang-sql";
import "./../styles/sqlPage/SqlEditor.css";
import "./../styles/sqlPage/Editor.css";

interface SqlEditorProps {
  onSubmit: (query: string) => void;
}

const SqlEditor = ({ onSubmit, onSelect }: SqlEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [selectedText, setSelectedText] = useState<string>("");

  useEffect(() => {
    if (editorRef.current) {
      const content = Array(20).fill("").join("\n");
      const view = new EditorView({
        doc: content,
        extensions: [
          basicSetup,
          sql(),
          EditorView.updateListener.of((update) => {
            if (update.selectionSet) {
              const state = update.state;
              const selection = state.selection.main;
              const selectedText = state.doc.sliceString(
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

      return () => {
        view.destroy();
      };
    }
  }, [onSelect]);

  const handleSubmit = () => {
    if (viewRef.current) {
      const query =
        selectedText.toString().trim() ||
        viewRef.current.state.doc.toString().trim();
      onSubmit(query);
    }
  };

  return (
    <div className="sql-editor">
      <div className="editor-navbar">
        <h3 className="editor-title">SQL Editor</h3>
        <div className="editor-navbar-actions">
          <button
            className="editor-submit-button"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="editor-main" ref={editorRef}></div>
    </div>
  );
};

export default SqlEditor;
