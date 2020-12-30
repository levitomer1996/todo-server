import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { NoteStatus } from '../../note-status.enum';

export class taskStatusValidationPipe implements PipeTransform {
  readonly AllowedStatuses = [
    NoteStatus.OPEN,
    NoteStatus.IN_PROGRESS,
    NoteStatus.DONE,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.AllowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
