import { defineEventHandler, readBody, sendError, createError } from 'h3';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import { createWriteStream } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

let fileChunks: Record<number, Buffer> = {};

export default defineEventHandler(async (event) => {
  const form = formidable({});

  return new Promise((resolve, reject) => {
    form.parse(event.node.req, async (err: any, fields: any, files: any) => {
      if (err) {
        sendError(event, createError({ statusCode: 500, message: err.message }));
        return reject(err);
      }

      const fileName = String(fields.fileName)
      const lessonId = String(fields.lessonId);
      const chunk = files.file[0];
      const chunkIndex = parseInt(fields.chunkIndex as string, 10);
      const totalChunks = parseInt(fields.totalChunks as string, 10);
      
      // Сохраняем чанки во временные файлы
      const uploadDir = path.join(process.cwd().toString(), 'public', 'lesson-videos', String(lessonId));
      const chunkPath = path.join(uploadDir, `chunk-${chunkIndex}`);
      
      fs.mkdir(uploadDir, { recursive: true })
      
      await fs.rename(chunk.filepath, chunkPath);

      // После последнего чанка объединяем все чанки в один файл
      if (chunkIndex === totalChunks - 1) {
        const finalFilePath = path.join(uploadDir, fileName);
        const writeStream = createWriteStream(finalFilePath);

        for (let i = 0; i < totalChunks; i++) {
          const pathToChunk = path.join(uploadDir, `chunk-${i}`);
          const chunkData = await fs.readFile(pathToChunk);
          writeStream.write(chunkData);
          await fs.unlink(pathToChunk); // Удаляем временный чанк
        }

        await writeStream.end();
        resolve({ message: 'File uploaded and merged successfully', uploadDir });
      } else {
        resolve({ message: 'Chunk received', uploadDir });
      }
    });
  });
});
