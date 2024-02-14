import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_TAXONOMIA, ROUTE_TURISTEAR } from '../routes/route-names';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  route_taxonomia = '/'+ROUTE_TAXONOMIA;
  route_turistear = '/'+ROUTE_TURISTEAR;
}
