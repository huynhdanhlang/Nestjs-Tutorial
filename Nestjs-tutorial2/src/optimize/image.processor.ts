import { Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
import * as AdmZip from 'adm-zip';
import buffer from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import { Express } from 'express';

@Processor('image')
export class ImageProcessor {
  @Process('optimize')
  async handleOptimization(job: Job, doneCallBack: DoneCallback) {
    const files: Express.Multer.File[] = job.data.files;

    const optimizationPromise: Promise<Buffer>[] = files.map((file) => {
      const fileBuffer = Buffer.from(file.buffer);
      return buffer.buffer(fileBuffer, {
        plugins: [
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      });
    });

    const optimizeImages = await Promise.all(optimizationPromise);

    const zip = new AdmZip();

    optimizeImages.forEach((image, index) => {
      const fileData = files[index];
      zip.addFile(fileData.originalname, image);
    });
    doneCallBack(null, zip.toBuffer());
  }
}

export default ImageProcessor;
