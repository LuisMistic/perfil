import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './componentes/base/base.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { InicialComponent } from './componentes/inicial/inicial.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { MatrixComponent } from './componentes/matrix/matrix.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    NavbarComponent,
    InicialComponent,
    MiPerfilComponent,
    MatrixComponent,
    ProyectosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
