import React from 'react';
import './App.css';
import Header from './Header';
import TodoBoard from './TodoBoard';

function App() {
  return (
	<div style={{backgroundColor:"rgb(75, 191, 107)",height:"100%", overflow:"scroll", display:"block"}}>
		<Header/>
		<div className="d-flex flex-column" style={{marginTop:"40px"}}>
			<TodoBoard/>
		</div>
	</div>
  );
}

export default App;
