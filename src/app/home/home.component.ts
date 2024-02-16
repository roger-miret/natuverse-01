import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_TAXONOMIA, ROUTE_TURISTEAR } from '../routes/route-names';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  route_taxonomia = '/'+ROUTE_TAXONOMIA;
  route_turistear = '/'+ROUTE_TURISTEAR;
}
