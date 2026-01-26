import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string; // Lưu ý: Cần mã hóa trước khi lưu
}
export const UserSchema = SchemaFactory.createForClass(User);
