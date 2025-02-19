import { Controller, Get, Query } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Controller('webtoon')
export class WebtoonController {
  constructor(
    private readonly webtoonService: WebtoonService,
    private readonly configService: ConfigService,
  ) {}

  @Get('all')
  async getAllWebtoons() {
    return await this.webtoonService.getAllWebtoons();
  }

  @Get('upload')
  async uploadWebtoons(@Query('url') imageUrl: string) {
    if (!imageUrl) {
      return { error: 'URL을 입력하세요' };
    }

    try {
      const uploadedUrl = await this.uploadImageToGCP(imageUrl);
      console.log(`🌍 최종 업로드된 이미지 URL: ${uploadedUrl}`);
    } catch (error) {
      console.error(`🚨 업로드 실패: ${error.message}`);
    }
  }

  async uploadImageToGCP(imageUrl) {
    const keyFilePath = path.resolve(
      __dirname,
      '../../../gcp-storage-key.json',
    );

    const storage = new Storage({
      keyFilename: keyFilePath,
    });
    const bucketName = this.configService.get('GCP_BUCKET_NAME');
    console.log(`🗑️ 버킷 이름: ${bucketName}`);

    try {
      console.log(`📥 원격 이미지 가져오는 중: ${imageUrl}`);

      const response = await fetch(imageUrl);
      if (!response.ok)
        throw new Error(`이미지 다운로드 실패: ${response.statusText}`);

      const buffer = await response.arrayBuffer();
      const fileName = `uploads/${uuidv4()}.jpg`;

      const bucket = storage.bucket(bucketName);
      const file = bucket.file(fileName);
      await file.save(Buffer.from(buffer), {
        contentType: response.headers.get('content-type') || 'image/jpeg',
        public: true,
      });

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      console.log(`✅ 업로드 완료: ${publicUrl}`);

      return publicUrl;
    } catch (error) {
      console.error(`❌ 오류 발생: ${error.message}`);
      throw error;
    }
  }
}
