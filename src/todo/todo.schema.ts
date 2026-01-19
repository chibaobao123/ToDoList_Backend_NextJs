import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  status: number;

  @Prop({ default: false })
  active: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
