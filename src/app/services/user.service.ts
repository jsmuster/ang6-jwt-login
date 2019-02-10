import { UserInfoModel } from '../models/userInfo';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { JwtHelperService } from '@auth0/angular-jwt';
 
@Injectable()
export class UserService
{
	private jwtHelper: JwtHelperService;

	private bIsLoggedIn: boolean = false;
	private user: UserInfoModel = new UserInfoModel();

	private userDataSrc = new Rx.Subject<any>();
	private incrementDataSrc = new Rx.Subject<any>();

	userData = this.userDataSrc.asObservable();
	incrementData = this.incrementDataSrc.asObservable();

	constructor(private http: HttpClient)
	{
		this.jwtHelper = new JwtHelperService();

		let userData = JSON.parse(localStorage.getItem("userData"));

		/* retrieve user data from local storage if token isn't expired */
		if(userData != null && userData.user_name != null && userData.token != null && this.jwtHelper.isTokenExpired(userData.token) != true)
		{
			this.user.user_name = userData.user_name;
			this.user.counter = userData.counter;
			this.user.nextCounter = userData.nextCounter;
			this.user.token = userData.token;

			this.bIsLoggedIn = true;
		}
	}

	setUserData(data: any)
	{
		this.user.user_name = data.user_name;

		this.user.counter = data.counter;
		this.user.nextCounter = data.nextCounter;
		//this.user.token = data.token;

		this.userDataSrc.next(this.user);
	}

	getUser()
	{
		return this.user;
	}

	isLoggedIn()
	{
		return this.bIsLoggedIn;
	}

	incrementUserData(data: any)
	{
		this.user.counter = data.counter;
		this.user.nextCounter = data.nextCounter;

		this.incrementDataSrc.next(this.user);
	}

	login(loginData: any, cb:any)
	{
		this.http.post('/api/v1/user/login', loginData).subscribe((data:any) => {
			
		    if(data.success == true)
		    {
				/* initial user data that comes from server */
				this.setUserData(data.user);

				/* execute a post */
				if(cb != null)
		      	{
		      		cb(true, data.user);
		      	}

		      	/* set user data into a local cookie */
		      	localStorage.setItem("userData", JSON.stringify(data.user));

		      	//const token = localStorage.getItem('token');

		      	/* set the service as logged in */
		      	this.bIsLoggedIn = true;
			}
			
		}, (error) =>
		{
		    if(error.status != 404)
		    {
		    	cb(false, error.error.error);
		    }
			
		});
	}

	loadUser(cb: any)
	{
		let user: UserInfoModel = this.user;
		
		if(user != null && user.user_name != null)
		{
			let headers = new HttpHeaders().set("Authorization", "Bearer " + user.token);
			
			this.http.get('/api/v1/user/' + user.user_name, {headers: headers}).subscribe((data:any) => {

	       		if(data != null && data.user != null && data.user.user_name != null)
				{
					if(data.user.counter > 0 && (user.user_name == data.user.user_name))
					{
						if(cb != null)
						{
							cb(true, data.user.user_name, data.user.counter, data.user.nextCounter);
						}
					}
					
					this.setUserData(data.user);
				}
				else
				{
					console.error("There was an error at loading '/api/v1/user/" + user.user_name + "'");
					// throw {
					//     name: "ValidationError",
					//     message: "There was an error at loading '/api/v1/user/" + user.user_name + "'"
					// };
				}
		    });
		}
		else
		{
			cb(false, user.user_name);
		}
	}

	increment(user_name: string, cb: any)
	{
		let user: UserInfoModel = this.user;
		
		if(user != null && user.token != null)
		{
			let headers = new HttpHeaders().set("Authorization", "Bearer " + user.token);
			
			this.http.get('/api/v1/user/increment/' + user_name, {headers: headers}).subscribe((data:any) => {
				
	       		if(data != null && data.user != null && data.user.user_name != null)
				{
					if(data.user.counter > 0 && (user_name == data.user.user_name))
					{
						cb(true, user_name, data.user.counter, data.user.nextCounter);

						// this.counter = data.user.counter;
						// this.nextCounter = data.user.nextCounter;
					}
					
					/* increment user data */
					this.incrementUserData(data.user);
				}
				else
				{
					cb(false, user_name);

					console.error("There was an error at loading '/api/v1/user/" + user_name + "'");
				}
		    });
		}
		else
		{
			cb(false, user_name);
			
			console.error("Error incrementing a user. (user_name:" + user_name + ")");
		}
	}

}