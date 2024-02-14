import { inject } from "@angular/core";
import { UserOrNull } from "../../models/user"
import { ROUTE_TURISTEAR, ROUTE_TAXONOMIA } from "../../routes/route-names";
import { Router } from "@angular/router";

export function resolveNavigation(user:UserOrNull, router:Router){
    
    if(user==null){
        alert('user is null!');
    }else if(user['turistear']=='1'){
        router.navigate(['/'+ROUTE_TURISTEAR]);
      }else if(user['taxonomia']=='1'){
        router.navigate(['/'+ROUTE_TAXONOMIA]);
      }else{
        router.navigate(['/home']);
      }

}