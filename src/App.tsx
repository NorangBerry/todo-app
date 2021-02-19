import React from 'react';
import './App.css';
import Header from './Header';
import TodoBoard from './TodoBoard';

function App() {
  return (
    <div style={{backgroundColor:"rgb(75, 191, 107)", height:"100%"}}>
		<Header/>
		<TodoBoard/>
    </div>
  );
}

export default App;
