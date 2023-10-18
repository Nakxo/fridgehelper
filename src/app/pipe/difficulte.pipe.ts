import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficulte'
})
export class DifficultePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'FACILE': return 'Facile';
      case 'TRES_FACILE': return 'Très Facile';
      case 'NORMAL': return 'Normal';
      case 'DIFFICILE': return 'Difficile';
      case 'TRES_DIFFICILE': return 'Très difficile'
      default: return value;
    }

  }
}
