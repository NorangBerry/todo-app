import React from 'react';
import './App.css';
import onClickOutside from "react-onclickoutside";
import { API } from './urls';

interface Prop{
	text:string;
	id:string;
}
interface State{
	title:string;
	edit_mode:boolean;
}

class TodoColumnTitle extends React.Component<Prop,State>{
	title_input_ref: HTMLInputElement | null | undefined;
	constructor(props: any){
		super(props);
		this.state= {title:props.text, edit_mode:false};
	}

	fetchUpdateTitle(title:string){
		fetch(`${API}/todo/${this.props.id}/column`,{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({title:title}),
			method:"POST"
		}).then(response=>{
			return response.json()
		}).then(response=>{
		})
	}

	handleClickOutside = () => {
		var title = this.state.title;
		if(this.title_input_ref){
			if(this.state.title !== this.title_input_ref.value){
				this.fetchUpdateTitle(this.title_input_ref.value)
				title = this.title_input_ref.value
			}
		}
		this.setState({edit_mode:false,title:title});
	};
	render(){
		return(
		<>
		{
			this.state.edit_mode?
			<input className='outside-click-ignore-class' type="text" defaultValue={this.state.title} style={{width:"100%"}}
				ref={node => this.title_input_ref = node}/>
			:
			<button style={{background:"transparent", border:"none",cursor:"pointer"}} onClick={()=>{this.setState({edit_mode:true})}}>
				{this.state.title}
			</button>
		}
		</>
		);
	}
}
export default onClickOutside(TodoColumnTitle);
