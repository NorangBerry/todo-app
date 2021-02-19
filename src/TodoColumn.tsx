import React from 'react';
import './App.css';
import TodoColumnTitle from './TodoColumnTitle';
import { Todo } from './model';

interface Prop{
	data:Todo;
}

function TodoColumn(props:Prop) {
	return (
		<div style={{width:"260px", backgroundColor:"rgb(211, 209, 203)", margin:"8px", height:"auto"}}>
			<div className="text-block" style={{height:"20px", padding:"10px 8px"}}>
				<TodoColumnTitle outsideClickIgnoreClass="outside-click-ignore-class" text={props.data.title} id={props.data._id}/>
			</div>
			{
				props.data.cards.map((value,index)=>{
					return(
						<div key={index}>
							{value}
							{/* <TodoCard text={value}/> */}
						</div>
					)
				})
			}
			{/* <AddButton/> */}
		</div>
	);
}

export default TodoColumn;
