import styles from "./style.module.less";
import { message, Upload, type UploadProps, Button, Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { CHUNK_SIZE } from './config'
const { Dragger } = Upload;

const UploadPage = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  

  const uploadFileInChunks = async (file: File) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const fileChunks = [];

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      fileChunks.push(chunk);
    }

    for (let i = 0; i < fileChunks.length; i++) {
      const formData = new FormData();
      formData.append("chunk", fileChunks[i]);
      formData.append("filename", file.name);
      formData.append("chunkIndex", i.toString());
      formData.append("totalChunks", totalChunks.toString());

      try {
        await axios.post("/api/upload", formData, {
          onUploadProgress: (event: any) => {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          },
        });
      } catch (error) {
        message.error(`分片 ${i + 1} 上传失败`);
        return;
      }
    }

    // 通知服务器合并分片
    try {
      await axios.post("/api/upload/merge", {
        filename: file.name,
        totalChunks,
      });
      message.success("文件上传成功");
    } catch (error) {
      message.error("文件合并失败");
    }
  };

  const handleFileUpload = (file: File) => {
    uploadFileInChunks(file);
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false; // 阻止默认上传行为
    },
    onChange(info) {
      setFileList(info.fileList);
    },
    fileList,
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
          {uploadProgress > 0 && (
            <Progress percent={uploadProgress} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
