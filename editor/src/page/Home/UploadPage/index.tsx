import styles from "./style.module.less";
import { message, Upload, type UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Dragger } = Upload;

const UploadPage = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      console.log(info, "=====");
      console.log("测试插件")
    },
    fileList: [],
  };

  return (
    <div className={styles.uploadPage}>
      <div className={styles.container}>
        <div className={styles.upload}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件进行上传</p>
            <p className="ant-upload-hint">
              支持单文件和多文件上传，文件类型不限
            </p>
          </Dragger>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
