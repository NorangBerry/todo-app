import React from 'react';
import './App.css';
import TodoColumn from './TodoColumn';

function TodoBoard() {
	const test_data = ['그룹1','그룹2']
	return (
		<div style={{display:"inline-flex",margin:"0px"}}>
		{
			test_data.map((value,index)=>{
				return (
				<TodoColumn key={index}/>
			)})
		}
		</div>
	);
}

export default TodoBoard;
