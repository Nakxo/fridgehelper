import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToHigherUnit'
})
export class ConvertToHigherUnitPipe implements PipeTransform {
  transform(value: number, baseUnit: string): string {
    if (baseUnit === 'gr' && value >= 1000) {
    const convertedValue = value / 1000;
    if (Number.isInteger(convertedValue)) {
      return `${convertedValue} Kg`;
    } else {
      return `${convertedValue.toFixed(3)} Kg`;
    }
  } else if (baseUnit === 'ml' && value >= 1000) {
    const convertedValue = value / 1000;
    if (Number.isInteger(convertedValue)) {
      return `${convertedValue} L`;
    } else {
      return `${convertedValue.toFixed(3)} L`;
    }
  } else {
    return `${value.toFixed(2)} ${baseUnit}`;
  }
}
}
