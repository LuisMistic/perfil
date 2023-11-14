import { Component, OnInit } from '@angular/core';
import { ServicioCompartido } from 'src/app/servicio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  mostrarAnimacionCierre: boolean = false;

  constructor(public servicioCompartido: ServicioCompartido) {}
  ngOnInit(){
    this.servicioCompartido.obtenerNotificacionCierre().subscribe(cierre => {
      // Cuando se recibe la notificación de cierre, puedes activar tu animación aquí
      this.mostrarAnimacionCierre = cierre;
      console.log("Notificación recibida del navbar hacia perfil");
    });
  }


cambiarComponente(nombre: string) {
    if (nombre !== this.servicioCompartido.currentComponent) {
        this.servicioCompartido.cambiarComponente(nombre);
        console.log("Cambio de componente fue un éxito");
    }
}
  }

