import { useState } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";

const useEditor = () => {
    const [editor] = useState(() => withReact(createEditor()))
    return editor;
};

export default useEditor;