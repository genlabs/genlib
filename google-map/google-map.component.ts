import { Component, Input, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'google-map',
    templateUrl: 'google-map.component.html',
    styleUrls: [ 'google-map.component.css']
})
export class GoogleMapComponent implements OnInit{
    private _address:string;
    private _apikey:string;
    private queryURL:SafeResourceUrl;
    constructor(private santiner:DomSanitizer) {}

    ngOnInit() {
        this.queryURL = this.santiner.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?key=' + this._apikey +'&q=' +  this._address);
    }

    @Input() 
    set address(addr:string) {
        this._address = encodeURIComponent(addr);
        this.queryURL = this.santiner.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?key=' + this._apikey +'&q=' +  this._address);
    }
    get address() {
        return this._address;
    }

    @Input()
    set apikey(key:string) {
        this._apikey = key;
    }

    get apikey() {
        return this._apikey;
    }

}