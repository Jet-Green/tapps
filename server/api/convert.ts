import { defineEventHandler, sendError } from 'h3';
import ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';
import { promises as fs } from 'fs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const inputPath = body.inputPath; // Путь к входному MP4 файлу
  const outputPath = body.outputPath; // Путь для HLS файлов

  try {
    // Убедитесь, что путь для выходных файлов существует
    await fs.mkdir(outputPath, { recursive: true });

    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          '-f hls',
          '-hls_time 10',
          '-hls_list_size 0',
          '-hls_segment_filename',
          join(outputPath, 'segment_%03d.ts'),
        ])
        .output(join(outputPath, 'playlist.m3u8'))
        .on('end', () => resolve(undefined))
        .on('error', (err) => reject(err))
        .run();
    });

    return { message: 'Conversion to HLS complete' };
  } catch (error: any) {
    sendError(event, createError({ statusCode: 500, message: error.message }));
  }
});