import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.floor(value);
    const minutes = value % 1 * 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }
}


