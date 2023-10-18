import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], field: string): any[] {
    return array.sort((a, b) => a[field] - b[field]);
  }

}
