// pages/admin/editor.js

import { useEffect, useRef } from "react";
import "jsoneditor/dist/jsoneditor.min.css";

export default function Editor() {
  const editorRef = useRef(null);

  useEffect(() => {
    // Check if we're running in the browser environment
    if (typeof window !== "undefined") {
      // Import JSONEditor library dynamically
      import("jsoneditor/dist/jsoneditor.min.js")
        .then(({ default: JSONEditor }) => {
          // Initialize JSON Editor
          const container = document.getElementById("jsoneditor");
          const options = {
            mode: "tree", // Set the initial view mode (tree, text, or code)
            onChange: function () {
              // Handle changes to the JSON data
            },
          };
          const editor = new JSONEditor(container, options);
          editorRef.current = editor;

          // Load JSON data
          const jsonData = { key: "value" }; // Replace with your JSON data
          editor.set(jsonData);
        })
        .catch((error) => {
          console.error("Failed to load JSONEditor library:", error);
        });
    }
  }, []);

  return (
    <div>
      <h1>JSON Editor</h1>
      <div id="jsoneditor" style={{ height: "500px" }}></div>
    </div>
  );
}
