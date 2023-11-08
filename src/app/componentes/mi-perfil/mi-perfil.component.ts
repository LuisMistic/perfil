import { Component, OnInit } from '@angular/core';
import { ServicioCompartido } from 'src/app/servicio.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  mostrarAnimacionCierre: boolean = false;

  constructor(public servicioCompartido: ServicioCompartido) {}

  ngOnInit() {
    this.servicioCompartido.obtenerNotificacionCierre().subscribe(cierre => {
      // Cuando se recibe la notificación de cierre, puedes activar tu animación aquí
      this.mostrarAnimacionCierre = cierre;
      console.log("Notificación recibida del navbar hacia perfil");
    });
  }

  // Resto del código de tu componente
}
