import React from 'react';
import './App.css';
import { Card } from './model';
import { API } from './urls';
import onClickOutside from 'react-onclickoutside';

interface Props{
	card:Card;
	column_id:string
}

interface States{
	complete:boolean;
	edit_mode:boolean;
}

class TodoCard extends React.Component<Props,States> {
	input_ref: HTMLInputElement | null | undefined;
	constructor(props:Props){
		super(props);
		this.state={complete:this.props.card.complete, edit_mode:false};
	}

	componentDidUpdate(){
		if(this.state.edit_mode && this.input_ref){
			this.input_ref.focus();
		}
	}

	completeCard(e: React.ChangeEvent<HTMLInputElement>){
		this.setState({complete:e.target.checked})
		fetch(`${API}/todo/card/complete`,{
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				complete:e.target.checked,
				column_id:this.props.column_id,
				id:this.props.card._id
			}),
			method:"POST"
		}).then(response=>{
			return response.json();
		}).then(response=>{
		})
	}

	deleteCard(e: React.KeyboardEvent<HTMLButtonElement>){
		if(e.key==='Delete'){
			fetch(`${API}/todo/card`,{
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify({
					column_id:this.props.column_id,
					id:this.props.card._id
				}),
				method:"DELETE"
			}).then(response=>{
				return response.json();
			}).then(response=>{
			})
		}

	}

	handleClickOutside = () => {
		if(!this.input_ref)
			return;
		if(this.input_ref.value){
			fetch(`${API}/todo/card`,{
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify({
					column_id:this.props.column_id,
					id:this.props.card._id,
					text:this.input_ref.value
				}),
				method:"POST"
			}).then(response=>{
				return response.json();
			}).then(response=>{
			})
		}
		this.setState({edit_mode:false});
	};

	render(){
		return (
			<>
			{
				this.state.edit_mode?
				<input className='outside-click-ignore-class' type="text" defaultValue={this.props.card.text} style={{width:"100%"}}
					ref={node => this.input_ref = node}/>
				:
				<button className={`todo-card rounded ${this.state.complete? "line-through" : ""}`}
					onKeyUp={(e)=>this.deleteCard(e)}
					onDoubleClick={()=>this.setState({edit_mode:true})}>
					<input type="checkbox" name="complete" checked={this.state.complete} onChange={(e)=>this.completeCard(e)}/>
					{this.props.card.text}
				</button>
			}
			</>
		);
	}
}

export default onClickOutside(TodoCard);
