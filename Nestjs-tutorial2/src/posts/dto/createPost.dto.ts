import { IsString, IsNotEmpty } from 'class-validator';
export default class createPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  // content: string;
  @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];
}
