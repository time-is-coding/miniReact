import Editor from '@/components/Editor';
import styles from './style.module.less'

const Home = () => {
  return <div className={styles.home}>
    <div className={styles.editorBox}>
      <Editor />
    </div>
  </div>;
};

export default Home;