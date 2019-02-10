export class UserInfoModel
{
	user_name: string;
	
	counter: number;

	nextCounter: number;

	token: string;

	constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}