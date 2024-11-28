import { defineEventHandler, sendError } from 'h3';
import ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';
import { promises as fs } from 'fs';






async function getFilenamesFromHLSPlaylist(playlistPath: string) {
  // Read content of the playlist file
  const playlistContent = await fs.readFile(playlistPath, 'utf-8');

  // Split the playlist content by line
  const lines = playlistContent.split('\n');

  // Extract filenames
  const filenames = lines
    .filter(line => line && !line.startsWith('#')) // Ignore empty lines or comments
    .map(line => line.trim()) // Trim whitespace
    .filter((line, i) => i % 2 !== 0); // Get only the segment lines (every second line)

  return filenames;
}






export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const mp4FileName = body.mp4FileName.toString();
  const lessonId = body.lessonId.toString();


  const inputPath = join(process.cwd(), 'public', 'lesson-videos', lessonId, mp4FileName) // Путь к входному MP4 файлу
  const outputPath = join(process.cwd(), 'public', 'lesson-videos', lessonId) // Путь для HLS файлов

  try {
    // Убедитесь, что путь для выходных файлов существует
    await fs.mkdir(outputPath, { recursive: true });
    return new Promise((resolve, reject): void => {
      ffmpeg(inputPath)
      .outputOptions([
        '-f hls',
        '-hls_time 30',
        '-hls_list_size 0',
        '-hls_segment_filename',
        join(outputPath, 'segment_%03d.ts'),
      ])
      .output(join(outputPath, 'playlist.m3u8'))
      .on('end', () => {
        resolve('success');
      })
      .on('error', (err) => {
        reject(err);
      })
      .run();    
      // ffmpeg(input)
      //   .output(output)
      //   .on('end', () => {
      //     console.log('Processing finished successfully!');
      //     resolve(); // Resolve the promise
      //   })
      //   .on('error', (err) => {
      //     console.error('Error: ' + err.message);
      //     reject(err); // Reject the promise
      //   })
      //   .run();
    });
  } catch (error: any) {
    sendError(event, createError({ statusCode: 500, message: error.message }));
  }
});