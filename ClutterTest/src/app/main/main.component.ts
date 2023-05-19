import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
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

  initialCenter = {
    lat: 50.9,
    lng: 4.36,
  };
  mapConfig = {
    disableDefaultUI: true,
    fullscreenControl: false,
  };
  address: string = '';
  mapZoom: number = 9;
  markerPosition: google.maps.LatLngLiteral = { lat: 50.9, lng: 4.36 };
  markerOptions: google.maps.MarkerOptions = {
    // icon: {
    //   url: 'assets/hum.png',
    //   scaledSize: new google.maps.Size(32, 32),
    // },
  };
  city: string = '';
  country: string = '';
  flatNumber: string = '';
 // department: string = '';
  postal_code: string = '';
  @ViewChild('mapSearchField') searchField!: ElementRef;
  @ViewChild('GoogleMap') map!: GoogleMap;
  @ViewChild('flatNumber') myInputRef!: ElementRef<HTMLInputElement>;

  constructor() {}

  scroll(el: HTMLElement, index: number, width: number) {
    el.scrollIntoView({behavior:'smooth'});
    this.defaultWidth = width;
    this.imgSrc = this.imageSources[index - 1];
  }

  ngAfterViewInit(): void {
    this.searchListener();
  }

  searchListener() {
    const searchBox = new google.maps.places.Autocomplete(
      this.searchField.nativeElement
    );
    searchBox.setOptions({ types: ['geocode'] });
    searchBox.addListener('place_changed', () => {
      const place = searchBox.getPlace();
      if (place && place.geometry?.location) {
        this.extractAddressComponents(place);
      }
    });
  }
  extractAddressComponents(place: google.maps.places.PlaceResult) {
    this.city = '';
    this.country = '';
    this.flatNumber = '';
   // this.department = '';
    this.postal_code = '';
    place.address_components?.forEach((property) => {
      if (property.types[0] === 'locality') {
        this.city = '' + property.long_name;
      }/* else if (
        property.types[0] === 'administrative_area_level_1' ||
        property.types[0] === 'administrative_area_level_2'
      ) {
        this.department = '' + property.long_name;
      } */else if (property.types[0] === 'country') {
        this.country = '' + property.long_name;
      } else if (property.types[0] === 'postal_code') {
        this.postal_code = '' + property.long_name;
      }
    });
  }

  moveToAddress() {
    if(this.address.length!=0){
    if (this.flatNumber.length != 0 && !Number.isNaN(Number(this.flatNumber))) {
      if (this.city.length != 0 && this.country.length != 0) {
        this.changeInputStyle(0);
        this.changeInputStyle(1);
        const geocoder = new google.maps.Geocoder();

          this.address =
            this.flatNumber +
            ' ,' +
            this.searchField.nativeElement.value +
            ',' +
            this.city +
            ' ,' +
            this.country;
        let arrayTest: String[] = this.address.split(',');
        let arrayTest2: String[] = arrayTest[1].split(' ');
        let newStr: String = '';
        arrayTest2.forEach((text) => {
          if (text.match(/\d/) == null) {
            newStr += ' ' + text;
          }
        });

        arrayTest[1] = newStr;
        this.address = arrayTest.join(',');
        geocoder.geocode({ address: this.address }, (results, status) => {
          if (status === 'OK') {
            if (results && results[0].geometry?.location) {
              const location = results[0].geometry.location;
              this.mapZoom = 16;
              this.initialCenter = { lat: location.lat(), lng: location.lng() };
              this.markerPosition = {
                lat: location.lat(),
                lng: location.lng(),
              };
            }
          }
        });
      }
    this.address='';
    } else {
      this.changeInputStyle(1);
    }
  }else {
    this.changeInputStyle(0);
  }
  }

  changeInputStyle(number:number) {
   if(number===0){
    const inputElement = document.getElementById('street');
    if (inputElement != null) {
      if (
        (this.address.length === 0)
      ) {
        inputElement.style.setProperty('border-color', 'red');
      } else if (
        inputElement.style.borderColor == 'red' &&
        this.address.length != 0) {
        inputElement.style.removeProperty('border-color');
      }
    }
   }else{
    const inputElement = document.getElementById('num');
    if (inputElement != null) {
      if (
        !(this.flatNumber.length != 0 && !Number.isNaN(Number(this.flatNumber)))
      ) {
        inputElement.style.setProperty('border-color', 'red');
      } else if (
        inputElement.style.borderColor == 'red' &&
        this.flatNumber.length != 0 &&
        !Number.isNaN(Number(this.flatNumber))
      ) {
        inputElement.style.removeProperty('border-color');
      }
    }
   }
  }
}
