import { useState } from 'react'
import { createEditor } from 'slate'
import type { Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import styles from './styles.module.less'
import {mockData} from './config'

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
        <Editable className={styles.editor} />
      </Slate>
    )
}
export default Editor