import { ArrayType } from '@angular/compiler';
import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
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
    //   console.log("et  "+place.address_components?.at(0)?.long_name+" hum "+place.address_components?.at(0)?.types);
    //   console.log("et  "+place.address_components?.at(1)?.long_name+" hum "+place.address_components?.at(1)?.types);
    //   console.log("et "+place.address_components?.at(2)?.long_name+ " hum "+place.address_components?.at(2)?.types);
    this.city = '' + place.address_components?.at(1)?.long_name;

    this.department = '' + place.address_components?.at(2)?.long_name;
    this.country = '' + place.address_components?.at(3)?.long_name;
  }

  moveToAddress() {

    if (this.flatNumber.length != 0 && !Number.isNaN(Number(this.flatNumber))) {
      if(this.city.length!=0 && this.country.length!=0){

      this.changeInputStyle();
      const geocoder = new google.maps.Geocoder();


      if(this.searchField.nativeElement.value.split(',').length<3){
        this.address=
        this.flatNumber + " ," + this.searchField.nativeElement.value+","+this.city+" ,"+this.country;
      }
      else{
        this.address =
        this.flatNumber + " ," + this.searchField.nativeElement.value;
      }
     let arrayTest:String[]=this.address.split(',');
     let arrayTest2:String[]= arrayTest[1].split(' ');
     let newStr:String='';
     arrayTest2.forEach((text) => {
      if (text.match(/\d/) == null){
        newStr+=" "+ text;
      }
  });

  arrayTest[1]=newStr;
  this.address= arrayTest.join(',');
      geocoder.geocode({ address: this.address }, (results, status) => {
        if (status === 'OK') {
          if (results && results[0].geometry?.location) {
            const location = results[0].geometry.location;
            this.mapZoom = 16;
            this.initialCenter = { lat: location.lat(), lng: location.lng() };
            this.markerPosition = { lat: location.lat(), lng: location.lng() };
          }
        }
      });
    }
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
