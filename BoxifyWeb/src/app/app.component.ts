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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @ViewChild('mapSearchField') searchField!: ElementRef;
  @ViewChild('GoogleMap') map!: GoogleMap;

  constructor() {}

  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement
    );

    // searchBox.addListener('places_changed', () => {
    //   const places = searchBox.getPlaces();
    //   if (places?.length === 0) {
    //     console.log("est donc 1");
    //     return;
    //   }
      // const bounds = new google.maps.LatLngBounds();
      // places?.forEach((place) => {
      //   if (!place.geometry || !place.geometry.location) {
      //     return;
      //   }
      //   if (place.geometry.viewport) {
      //     bounds.union(place.geometry.viewport);
      //   } else {
      //     bounds.extend(place.geometry.location);
      //   }
      // });
      // this.map.fitBounds(bounds);
       console.log("est donc 2");
    //   this.moveToAddress();
    // });
  }

  moveToAddress(): void {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.address }, (results, status) => {

          if (status === 'OK' && results && results[0].geometry?.location) {

            const location = results[0].geometry.location;

            this.initialCenter = { lat: location.lat(), lng: location.lng() };
            this.markerPosition = { lat: location.lat(), lng: location.lng() };
            this.mapZoom = 16;
            this.map?.googleMap?.panTo(this.initialCenter);
            this.map?.googleMap?.setZoom(this.mapZoom);

          }else {
            console.error('pop up', status);
          }
      });
  }
}
