import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterType'
})
export class FilterTypePipe implements PipeTransform {
  transform(items: any[], selectedType: number): any {
      if (!items || !selectedType || selectedType === 0) {
          return items;
      }
      return items.filter(item => item.typeProduit.idTypeProduit === selectedType);
  }
}
