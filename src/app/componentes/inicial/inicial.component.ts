import { Component, OnInit } from '@angular/core';
import { ServicioCompartido } from 'src/app/servicio.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {
  mostrarAnimacionCierre: boolean = false;

  constructor(public servicioCompartido: ServicioCompartido) {}

  ngOnInit() {
    this.servicioCompartido.obtenerNotificacionCierre().subscribe(cierre => {
      // Cuando se recibe la notificación de cierre, puedes activar tu animación aquí
      this.mostrarAnimacionCierre = cierre;
      console.log("Notificación recibida del navbar");
    });
  }

  // Resto del código de tu componente
}
