import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../roles/roles.enum';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string; // Lưu ý: Cần mã hóa trước khi lưu

  @Prop({
    type: String,
    enum: Object.values(Role),
    default: Role.USER,
  })
  role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);
