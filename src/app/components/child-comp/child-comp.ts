import { afterEveryRender, afterNextRender, Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child-comp',
  imports: [],
  templateUrl: './child-comp.html',
  styleUrl: './child-comp.scss',
})
export class ChildComp {
  @Input() title!: string;

  constructor() {
    console.log('1 => ChildComp constructor called.');

    afterNextRender(() => {
      console.log('4 => ChildComp afterNextRender called.');
    });

    afterEveryRender(() => {
      console.log('5 => ChildComp afterEveryRender called.');
    });
  }

  ngOnChanges(change: SimpleChanges) {
    console.log('2 => ChildComp ngOnChanges called.');
  }

  ngOnInit() {
    console.log('3 => ChildComp ngOnInit called.');
  }

  ngOnDestroy() {
    console.log('6 => ChildComp ngOnDestroy called.');
  }
}
