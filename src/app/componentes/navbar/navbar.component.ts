import { Component } from '@angular/core';
import { ServicioCompartido } from 'src/app/servicio.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  expanded = false;
  flapText = 'Menu';

  constructor(public servicioCompartido: ServicioCompartido){
    this.servicioCompartido.currentComponent 
  }

  toggleNavbar() {
    this.expanded = !this.expanded;
    this.flapText = this.expanded ? 'Cerrar' : 'Menu';
  }
  // Cambiar el método cambiarComponente para que use una condición // 
 cambiarComponente(nombre: string) {
  // Obtenemos el estado actual del Navbar desde el servicio
  
  
  // Verificar si el nombre del componente al que quieres cambiar es diferente al nombre del componente actual
  if (nombre !== this.servicioCompartido.currentComponent) {
    // Llamar al método cambiarComponente del servicio con el nombre del componente al que quieres cambiar
    this.servicioCompartido.cambiarComponente(nombre);
    
    // Llamar al método mostrarNavbar del servicio para cambiar la visibilidad del Navbar

}
}
}