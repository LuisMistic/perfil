import { Component } from '@angular/core';
import { ServicioCompartido } from 'src/app/servicio.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    flapText = 'Menu';

    constructor(public servicioCompartido: ServicioCompartido) {
        this.servicioCompartido.currentComponent;
    }

    cambiarComponente(nombre: string) {
        if (nombre !== this.servicioCompartido.currentComponent) {
            this.servicioCompartido.cambiarComponente(nombre);
            console.log("Cambio de componente fue un éxito");
        }
    }
}
