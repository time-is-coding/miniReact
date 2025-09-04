import Editor from "@/components/Editor";
import styles from "./style.module.less";

const EditorPage = () => {
  return (
    <div className={styles.editorPage}>
      <div className={styles.editorBox}>
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
