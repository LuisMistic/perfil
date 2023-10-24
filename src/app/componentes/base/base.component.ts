import { Component } from '@angular/core';
import { ServicioCompartido } from 'src/app/servicio.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {
    
  constructor(public servicioCompartido: ServicioCompartido){
    this.servicioCompartido.currentComponent = 'inicial';
  }
}
