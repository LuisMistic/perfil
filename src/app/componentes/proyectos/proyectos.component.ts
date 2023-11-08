import { Component } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {

  squares = [
    { text: 'Rojo', colorClass: 'red' },
    { text: 'Azul', colorClass: 'blue' },
    { text: 'Verde', colorClass: 'green' },
    { text: 'Amarillo', colorClass: 'yellow' },
    { text: 'Rosa', colorClass: 'pink' },
    { text: 'Morado', colorClass: 'purple' },
    { text: 'Naranja', colorClass: 'orange' },
    { text: 'Café', colorClass: 'brown' },
    { text: 'Gris', colorClass: 'gray' },
    { text: 'Negro', colorClass: 'black' },
    { text: 'Turquesa', colorClass: 'teal' },
    { text: 'Lima', colorClass: 'lime' }
  ];

  onMouseOver() {
    // Lógica cuando se pasa el cursor sobre un cuadrado
  }
}