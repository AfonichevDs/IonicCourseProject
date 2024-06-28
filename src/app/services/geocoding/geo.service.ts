import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
export import GoogleMap = google.maps;
import { Coordinates } from 'src/app/models/location.model';

@Injectable({
    providedIn: 'root',
})
export class GeoService {
    constructor(private httpClient: HttpClient) {}

    public getAddress(lat: number, lng: number): Observable<string> {
        return this.httpClient
            .get<{ results: GoogleMap.GeocoderResult[]; status: GoogleMap.GeocoderStatus }>(
                this.url(lat, lng)
            )
            .pipe(
                map(({ results, status }) => {
                    if (status !== "OK" || results.length === 0) {
                        return '';
                    }
                    return results[0].formatted_address;
                })
            );
    }

    public getMapImage(coordinates: Coordinates, zoom: number) {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=${zoom}&size=500x300&maptype=roadmap
            &markers=color:red%7Clabel:Place%7C${coordinates.lat},${coordinates.lng}
            &key=${environment.mapsKey}`;
    }

    private url(lat: number | string, lng: number | string): string {
        return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.mapsKey}`;
    }
}
