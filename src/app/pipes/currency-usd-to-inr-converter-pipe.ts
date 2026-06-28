import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyUsdToInrConverter',
})
export class CurrencyUsdToInrConverterPipe implements PipeTransform {
  transform(amount: number, rate: number): number {
    return amount * rate;
  }
}
