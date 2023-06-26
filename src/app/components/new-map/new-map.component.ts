import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';


@Component({
  selector: 'app-new-map',
  templateUrl: './new-map.component.html',
  styleUrls: ['./new-map.component.css']
})
export class NewMapComponent implements OnInit{
  map!: Map;
  
  locations: any[] = [
{

  lat: 36.84088373304039,
  lon: -2.460258828754733,
 
},
{

 
  lat: 39.467192351697534,
  lon: -6.375181632274327,
  },
{

 
  lat: 36.52085536059023,
  lon: -6.281601504912957,

},
{

 
  lat: 36.52085536059023,
  lon: -6.281601504912957,
   },
{

  lat: 37.88782041580738,
  lon: -4.772837038167633,
  
},
{

 
  lat: 40.06937519004516,
  lon: -2.150989296819521,
 
},
{

 
  lat: 43.32162230071874,
  lon: -1.9841135177434397,
  
},
{
  lat: 37.26741486413947,
  lon: -6.932170831662226,
 
},
{


  lat: 42.13490760483781,
  lon: -0.4063626951247568,
  
},
{


  lat: 39.569432206379794,
  lon: 2.6581900666744027,
  
},
{


  lat: 43.36702295279169,
  lon: -8.411090543332168,

},
{

  lat: 42.46011369070304,
  lon: -2.4412073695662744,

},
{

  lat: 43.35398050693353,
  lon: -8.41935861617767,

},
{


  lat: 43.01592195603273,
  lon: -7.559436726225114,

},
{


  lat: 40.43681929716423,
  lon: -3.6863207276625056,

},
{

  lat: 36.72154601057811,
  lon: -4.428748590366904,
},
{

  lat: 37.88782041580738,
  lon: -4.772837038167633,
 
},
{

  lat: 40.06937519004516,
  lon: -2.150989296819521,
},
 
{

  lat: 40.34638799860307,
  lon: -1.1123361630513702,

},
{


  lat: 41.65601033580415,
  lon: -0.8792125830994135,
},

{

  lat: 41.510225837451145,
  lon: -5.741312560855069,

},
{
  lat: -34,
  lon: -3,
}
  ];


  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const center = fromLonLat([-3.74922, 40.463667]);

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: center,
        zoom: 4
      })
    });

    const vectorSource = new VectorSource();

    this.locations.forEach(location => {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat([location.lon, location.lat]))
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://res.cloudinary.com/dqi1rszmn/image/upload/v1687722750/pointer_kvszqf.png', scale: 0.1,
        })
      });

      iconFeature.setStyle(iconStyle);
      vectorSource.addFeature(iconFeature);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.map.addLayer(vectorLayer);
  }
}

 /* teachers: any[];
  locations: LatLngLiteral[];

  constructor(private teacherService: TeachersService) {
    this.teachers = [];
    this.locations = [];
  }

  ngOnInit() {
    this.teacherService.getAllTeachers().then((teachers: any[]) => {
      this.teachers = teachers;

      this.locations = this.teachers.map(teacher => ({
        lat: parseFloat(teacher.latitude),
        lng: parseFloat(teacher.longitude)
      }));

      console.log(this.locations);
    }).catch(error => {
      console.log(error);
    });
  }*/
