import S3 from '../../utils/yandexCloud'
import fs from 'fs';
import path from 'path';

function getFilePathsFromLocalHLS(filePath: string): string[] {
    try {
        // Читаем содержимое HLS файла
        const m3u8Content = fs.readFileSync(filePath, 'utf-8');

        // Разбиваем содержимое на строки
        const lines = m3u8Content.split('\n');

        // Фильтруем строки, которые содержат пути к сегментам
        const filePaths = lines
            .filter(line => line && !line.startsWith('#')) // Исключаем пустые строки и комментарии
            .map(line => line.trim());

        // Преобразуем относительные пути в абсолютные
        const absolutePaths = filePaths.map(segment => path.resolve(path.dirname(filePath), segment));

        return absolutePaths; // Возвращаем массив путей
    } catch (error) {
        console.error('Ошибка при чтении HLS файла:', error);
        throw new Error('Не удалось получить пути файлов HLS');
    }
}

export default defineEventHandler(async (event) => {
    const { lessonId } = await readBody(event); // Ожидаем массив путей к файлам
    const hlsPath = path.join(process.cwd(), 'public', 'lesson-videos', lessonId, 'playlist.m3u8')

    let files: string[] = getFilePathsFromLocalHLS(hlsPath);
    files.push(hlsPath); // include playlist.m3u8

    const uploadPromises = files.map((filePath: string) => {
        // Читаем файл по указанному пути
        const fullPath = filePath;

        return new Promise((resolve, reject) => {
            fs.readFile(fullPath, (err, data) => {
                if (err) {
                    return reject(`Ошибка чтения файла: ${err.message}`);
                }

                const uploadPath = path.join('lesson-videos', lessonId, path.basename(fullPath));
                const params = {
                    Bucket: 'factum-videos',                 // Название вашего бакета
                    Key: uploadPath,                         // Имя файла
                    Body: data,                              // Содержимое файла
                    ContentType: 'application/octet-stream', // Тип контента
                };

                S3.upload(params)
                    .promise()
                    .then(() => resolve({ uploadPath: uploadPath, status: 'загружен' }))
                    .catch((uploadError) => reject(`Ошибка загрузки: ${uploadError.message}`));
            });
        });
    });

    try {
        const results = await Promise.all(uploadPromises);

        fs.rmSync(path.join(process.cwd(), 'public', 'lesson-videos', lessonId), { recursive: true, force: true });
        
        return { success: true, results }; // Возвращаем успешные результаты
    } catch (error) {
        return { success: false, message: error }; // Обработка ошибок
    }
});