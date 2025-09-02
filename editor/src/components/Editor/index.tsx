import type { Descendant } from 'slate'
import { Slate, Editable } from 'slate-react'
import styles from './styles.module.less'
import useEditor from './hooks/useEditor'
import { PARAGRAPH } from './config/const'

const initialValue: Descendant[] = [
  {
    key: PARAGRAPH,
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const Editor = () => {
    const editor = useEditor();

    return (
      <Slate editor={editor} initialValue={initialValue}>
        <Editable className={styles.editor} />
      </Slate>
    )
}
export default Editor