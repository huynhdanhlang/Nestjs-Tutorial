import { IsString, IsNotEmpty } from 'class-validator';
export default class createPostDto {
  title: string;
  // content: string;
  @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];
}
