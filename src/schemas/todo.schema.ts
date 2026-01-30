import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './users.schema';

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  status: number;

  @Prop({ default: false })
  active: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
