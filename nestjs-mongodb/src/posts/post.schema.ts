import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Category } from 'src/categories/category.schema';
import { Series } from 'src/series/series.schema';
import { User } from 'src/users/user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop({
    set: (content: string) => {
      return content.trim();
    },
  })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  @Type(() => Category)
  categories: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Series.name,
  })
  series?: Series;
}

const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ title: 'text', content: 'text' });

export { PostSchema };
