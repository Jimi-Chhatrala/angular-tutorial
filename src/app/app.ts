import { Component, signal } from '@angular/core';
import { ShortNameMakerPipe } from './pipes/short-name-maker-pipe';
import { CurrencyUsdToInrConverterPipe } from './pipes/currency-usd-to-inr-converter-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ShortNameMakerPipe, CurrencyUsdToInrConverterPipe, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');
  fullName: string = 'john doe royal';

  usd = 100;
  usdToInr = 93;
}
