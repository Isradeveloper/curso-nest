import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiProperty,
} from '@nestjs/swagger';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticFile(imageName);
    res.sendFile(path);
  }

  @Post('product')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      // limits: { fileSize: 1024 * 1024 },
      storage: diskStorage({
        destination: './static/uploads/products',
        filename: fileNamer,
      }),
    }),
  )
  @ApiBody({
    description: 'The file to be uploaded',
    type: () => {
      class Body {
        @ApiProperty({ type: 'string', format: 'binary' })
        file: Express.Multer.File;
      }
      return Body;
    },
  })
  @ApiCreatedResponse({
    description: 'The secure url of the uploaded file',
    type: String,
  })
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;
    return { secureUrl };
  }
}
