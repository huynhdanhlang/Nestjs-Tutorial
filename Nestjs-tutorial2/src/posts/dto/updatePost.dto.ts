import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export default class updatePostDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  // content: string;
  paragraphs: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}
