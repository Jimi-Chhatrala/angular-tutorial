import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormater',
})
export class DataFormaterPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
