import React from 'react';
import './App.css';
import TodoColumnTitle from './TodoColumnTitle';

function TodoColumn() {
	const title = 'Things To Do'
	const todo_list = ['서버 테스트 추가','클라 테스트 추가']
	return (
		<div style={{width:"260px", backgroundColor:"rgb(211, 209, 203)", margin:"8px", height:"auto"}}>
			<div className="text-block" style={{height:"20px", padding:"10px 8px"}}>
				<TodoColumnTitle outsideClickIgnoreClass="outside-click-ignore-class" text={title}/>
			</div>
			{
				todo_list.map((value,index)=>{
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
