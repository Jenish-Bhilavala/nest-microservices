import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthUserDocument = AuthUser & Document;

@Schema({ timestamps: true, collection: 'auth_user' })
export class AuthUser {
  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user', enum: ['user', 'admin', 'vendor'] })
  role: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_verified: boolean;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
