import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterText'
})
export class FilterTextPipe implements PipeTransform {
  transform(items: any[], searchText: string): any {
      if (!items || !searchText) {
          return items;
      }
      return items.filter(item => item.nom.toLowerCase().includes(searchText.toLowerCase()));
  }
}
