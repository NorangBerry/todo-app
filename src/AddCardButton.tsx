import React from 'react';
import './App.css';
import onClickOutside from "react-onclickoutside";
import { API } from './urls';

interface Prop{
	id:string;
}
interface State{
	edit_mode:boolean;
}

class AddCardButton extends React.Component<Prop,State>{
	card_input_ref: HTMLInputElement | null | undefined;
	constructor(props: any){
		super(props);
		this.state= {edit_mode:false};
	}

	componentDidUpdate(){
		if(this.state.edit_mode && this.card_input_ref){
			this.card_input_ref.focus();
		}
	}

	fetchUpdateTitle(text:string){
		fetch(`${API}/todo/${this.props.id}/card`,{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({text:text}),
			method:"PUT"
		}).then(response=>{
			return response.json()
		}).then(response=>{
		})
	}

	handleClickOutside = () => {
		if(this.card_input_ref){
			if(this.card_input_ref.value){
				this.fetchUpdateTitle(this.card_input_ref.value)
			}
		}
		this.setState({edit_mode:false});
	};
	render(){
		return(
		<>
		{
			this.state.edit_mode?
			<input className='outside-click-ignore-class' type="text" defaultValue={""} style={{width:"100%", marginTop:"4px", height:"90%"}}
				ref={node => this.card_input_ref = node}/>
			:
			<button className="add-card-button rounded" onClick={()=>{this.setState({edit_mode:true})}}>
				{"+ Add another card"}
			</button>
		}
		</>
		);
	}
}
export default onClickOutside(AddCardButton);
