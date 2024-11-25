import { defineEventHandler, readMultipartFormData } from "h3";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export default defineEventHandler(async (event) => {
  try {
    // 读取上传的文件数据
    const data = await readMultipartFormData(event);
    if (!data || !data[0]) {
      return {
        code: 400,
        message: "No file uploaded",
      };
    }

    const file = data[0];

    // 确保上传目录存在
    const uploadDir = path.join(process.cwd(), "../../.temp");
    await mkdir(uploadDir, { recursive: true });

    // 生成文件名(这里用时间戳作为文件名,你也可以保留原始文件名)
    const timestamp = Date.now();
    const extension = path.extname(file.filename || "");
    const filename = `${timestamp}${extension}`;

    // 完整的文件保存路径
    const filepath = path.join(uploadDir, filename);

    // 将文件写入本地
    await writeFile(filepath, file.data);

    return {
      code: 200,
      message: "File uploaded successfully",
      filename,
    };
  } catch (error) {
    return {
      code: 500,
      message: "An error occurred while uploading the file",
    };
  }
});
