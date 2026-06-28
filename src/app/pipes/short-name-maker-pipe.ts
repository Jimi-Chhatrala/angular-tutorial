import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNameMaker',
})
export class ShortNameMakerPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const parts = value.trim().split(/\s+/).filter(Boolean);

    if (parts.length < 2) return value.trim();

    const first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
    const last = parts[parts.length - 1].charAt(0).toUpperCase();

    return `${first} ${last}.`;
  }
}
