import React from "react";
import { API } from "./urls";
import onClickOutside from 'react-onclickoutside';
import { isEmptyOrSpaces } from './util';

interface State{
	edit_mode:boolean
}

class AddColumnButton extends React.Component<{},State> {
	title_input_ref: HTMLInputElement | null | undefined;
	constructor(props:any){
		super(props);
		this.state={edit_mode:false};
	}

	componentDidUpdate(){
		if(this.state.edit_mode && this.title_input_ref){
			this.title_input_ref.focus();
		}
	}

	handleClickOutside = () => {
		if(this.title_input_ref && !isEmptyOrSpaces(this.title_input_ref.value)){
			this.addTodoColumn(this.title_input_ref.value);
		}
		this.setState({edit_mode:false});
		
	};
	addTodoColumn(title:string){
		fetch(`${API}/todo/column`,{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({title:title}),
			method: "PUT",
		})
	}
	render(){
		return (
			<>
			{
				this.state.edit_mode?
				<input className='outside-click-ignore-class' type="text" defaultValue={""} 
				style={{width:"100%", backgroundColor:'#fff', marginTop:"2px", boxShadow:"inset 0 0 0 2px #0079bf", border:"none",lineHeight:"20px", height:"90%"}}
				ref={node => this.title_input_ref = node}/>
				:
				<div className="text-block rounded" style={{width:"100%", height:"40px", padding:"10px 8px",color:"#fff",
				backgroundColor: "hsla(0,0%,100%,.24)",cursor: "pointer"}}
					onClick={()=>{this.setState({edit_mode:true})}}>
					{'+ Add another list'}
				</div>
			}
			
			</>
		);
	}
}

export default onClickOutside(AddColumnButton);