import React from 'react';
import './App.css';
import TodoColumn from './TodoColumn';
import { API } from './urls';
import { Todo } from './model';
import AddColumnButton from './AddColumnButton';

interface State{
	todos:Array<Todo>;
}

class TodoBoard extends React.Component<{},State> {
	constructor(props:any){
		super(props)
		this.state = {todos:[]};
	}
	componentDidMount(){
		this.fetchTodos();
	}
	fetchTodos(){
		fetch(`${API}/todo/`,{method: "GET"}).then(response=>{
			return response.json();
		}).then(response=>{
			this.setState({todos:response});
		}).catch(err=>{
			console.error(err);
		})
	}
	render(){
		return (
			<div style={{display:"inline-flex",margin:"0px"}}>
			{
				this.state.todos.map((value,index)=>{
					return (
					<TodoColumn key={index} data={value}/>
				)})
			}
			<div style={{width:"260px", margin:"8px", height:"auto"}}>
				<AddColumnButton outsideClickIgnoreClass="outside-click-ignore-class"/>
			</div>
			</div>
		);
	}
}

export default TodoBoard;
