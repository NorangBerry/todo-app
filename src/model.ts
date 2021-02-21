export interface Todo{
	_id:string;
	title:string;
	cards:Array<Card>;
	__v:number;
	createdAt:string;
	updatedAt:string;
}

export interface Card{
	complete:boolean;
	 _id:string;
	text:string;
	updatedAt:string;
	createdAt:string;
	subtask:Array<any>;
}