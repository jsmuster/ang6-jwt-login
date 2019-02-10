import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from './services/user.service';
import { UserInfoModel } from './models/userInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent
{
	title = 'Incrementor';

	constructor(private http: HttpClient, private userService:UserService)
	{

	}

	private counter: number;
	private nextCounter: number;
	private user_name: string;

  	ngOnInit()
	{
		/* subscribe to when user data gets incremented */
		this.userService.userData.subscribe((user)=> {
			
			this.counter = user.counter;
			this.nextCounter = user.nextCounter;
			this.user_name = user.user_name;
		});

		//UserHomePageComponent
	}
	
	handleOnConfirm(evt: any)
	{
		this.userService.increment(this.user_name, (success, user_name, counter, nextCounter) => {
			
			if(success)
			{
				this.counter = counter;
				this.nextCounter = nextCounter;
			}
		});
	}
}
