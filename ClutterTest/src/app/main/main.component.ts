import { Component,ElementRef} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{
  constructor(private elementRef: ElementRef) {}

  scrollToElement() {
    const targetElement = this.elementRef.nativeElement.querySelector('#target1');
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}

