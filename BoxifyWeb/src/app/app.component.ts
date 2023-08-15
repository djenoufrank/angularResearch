import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
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
  department: string = '';
  postal_code: string = '';
  @ViewChild('mapSearchField') searchField!: ElementRef;
  @ViewChild('GoogleMap') map!: GoogleMap;
  @ViewChild('flatNumber') myInputRef!: ElementRef<HTMLInputElement>;

  constructor() {}

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
    this.department = '';
    this.postal_code = '';
    place.address_components?.forEach((property) => {
      if (property.types[0] === 'locality') {
        this.city = '' + property.long_name;
      } else if (
        property.types[0] === 'administrative_area_level_1' ||
        property.types[0] === 'administrative_area_level_2'
      ) {
        this.department = '' + property.long_name;
      } else if (property.types[0] === 'country') {
        this.country = '' + property.long_name;
      } else if (property.types[0] === 'postal_code') {
        this.postal_code = '' + property.long_name;
      }
    });
  }

  moveToAddress() {
    if (this.flatNumber.length != 0 && !Number.isNaN(Number(this.flatNumber))) {
      if (this.city.length != 0 && this.country.length != 0) {
        this.changeInputStyle();
        const geocoder = new google.maps.Geocoder();

      //  if (this.searchField.nativeElement.value!=google.maps.places) {
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
      this.changeInputStyle();
    }
  }

  changeInputStyle() {
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
