import { Data, Model } from '../helpers';
import { IsOptional, IsString } from 'class-validator';
import { COLLECTIONS } from '../constants';

export class Note extends Data {
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  body: string;

  constructor(userId: string, title: string, body: string) {
    super();
    this.userId = userId;
    this.title = title;
    this.body = body;
  }
}

export const noteModel = new Model<Note>(COLLECTIONS.NOTES);
