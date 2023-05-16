import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  defaultWidth: number = 200;
  imgSrc = 'assets/smart_storage.avif';
  imageSources: string[] = [
    'assets/smart_storage.avif',
    'assets/bbb-8fc39afe39f90d798bfb16a57f7c2bcf.svg',
    'assets/trust_pilot-6148615242650a72e59813f67a728487.svg',
    'assets/yelp-33063ec15dcb38ecb27df5ef94c7d657.svg',
  ];
  scroll(el: HTMLElement, index: number, width: number) {
    el.scrollIntoView({behavior:'smooth'});
    this.defaultWidth = width;
    this.imgSrc = this.imageSources[index - 1];
  }
}
