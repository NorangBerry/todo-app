import './App.css';
import TodoColumnTitle from './TodoColumnTitle';
import { Todo } from './model';
import AddCardButton from './AddCardButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoCard from './TodoCard';

interface Prop{
	data:Todo;
}

function TodoColumn(props:Prop) {
	return (
		<div style={{height:"100%", display:"block"}}>
			<div className="rounded d-flex flex-column" 
					style={{width:"260px", backgroundColor:"rgb(235, 236, 240)", margin:"8px", justifyContent: "center", alignItems: "center"}}>
				<div className="text-block" style={{height:"40px", padding:"8px", width:"100%"}}>
					<TodoColumnTitle outsideClickIgnoreClass="outside-click-ignore-class" text={props.data.title} id={props.data._id}/>
				</div>
				{
					props.data.cards.map((value,index)=>{
						return(
							<TodoCard outsideClickIgnoreClass="outside-click-ignore-class" column_id={props.data._id} key={index} card={value}/>
						)
					})
				}
				<div style={{margin:"8px", width:"90%"}}>
					<AddCardButton id={props.data._id} outsideClickIgnoreClass="outside-click-ignore-class"/>
				</div>
			</div>
		</div>
	);
}

export default TodoColumn;
