import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserInfoModel } from '../models/userInfo';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})

export class UserHomePageComponent implements OnInit
{
	private user: UserInfoModel = new UserInfoModel();
	

	constructor(private http: HttpClient, private route: ActivatedRoute, private userService:UserService, private router:Router) {

		this.subscriber = this.route.params.subscribe(params => {
	       this.user_name = params.uid;
	       //this.getUserData(this.user);
	    });

	    this.userService.incrementData.subscribe((user)=> {
			this.user.counter = user.counter;
			this.user.nextCounter = user.nextCounter;
		});

		this.userService.userData.subscribe((user)=> {
			
			this.user.counter = user.counter;
			this.user.nextCounter = user.nextCounter;

			this.user.token = user.token;
			this.user.user_name = user.user_name;
		});

		this.getUserData();
	}

	private subscriber: any;
	private user_name:string;

	handleOnIncrement(evt)
	{
		this.getUserData();
	}

	ngOnInit()
	{

	}
	
	getUserData()
	{
		this.userService.loadUser((success, user_name, counter, nextCounter) => {
			
			if(success)
			{
				this.user.counter = counter;
				this.user.nextCounter = nextCounter;
			}
			else
			{
				// go back to login page
				let path = '/';
				
				this.router.navigate([path]);
			}
		});
	}

	getUserData_()
	{
		let user: UserInfoModel = this.userService.getUser();

		if(user != null && user.user_name != null)
		{
			let headers = new HttpHeaders().set("Authorization", "Bearer " + user.token);

			this.http.get('/api/v1/user/' + user.user_name, {headers: headers}).subscribe((data:any) => {

	       		if(data != null && data.user != null && data.user.user_name != null)
				{
					if(data.user.counter > 0 && (user.user_name == data.user.user_name))
					{
						//this.user.user_name = this.user_name;
						this.user.counter = data.user.counter;
						this.user.nextCounter = data.user.nextCounter;
					}

					this.userService.setUserData(data.user);
				}
				else
				{
					console.error("There was an error at loading '/api/v1/user/" + user.user_name + "'");
				}
		    });
		}
		else
		{
			// go back to login page
			let path = '/';

			this.router.navigate([path]);
		}
	}

}