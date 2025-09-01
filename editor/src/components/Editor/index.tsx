import { useState } from 'react'
import { createEditor } from 'slate'
import type { Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const Editor = () => {
    const [editor] = useState(() => withReact(createEditor()))

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable />
        </Slate>
    )
}
export default Editor