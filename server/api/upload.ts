import { defineEventHandler, readBody, sendError } from 'h3';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default defineEventHandler(async (event) => {
  const form = formidable({});

  return new Promise((resolve, reject) => {
    form.parse(event.node.req, async (err: any, fields: any, files: any) => {
      if (err) {
        sendError(event, createError({ statusCode: 500, message: err.message }));
        return reject(err);
      }

      const file = files.file[0]; // Убедитесь, что указано правильное имя поля


      // Обработка файла - например, перемещение в требуемую директорию
      const uploadPath = path.join(process.cwd(), 'public', 'lesson-videos', file.originalFilename);
      await fs.rename(file.filepath, uploadPath);

      resolve({ message: 'File uploaded successfully', uploadPath });
    });
  });
});
