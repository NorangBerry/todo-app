import express from 'express';
import mongoose, { Schema } from 'mongoose';

const subtaskSchema = new Schema({
	text: { type: String, required: true }
},{ timestamps: true});

const cardSchema = new Schema({
	text: { type: String, required: true },
	description: { type: String },
	complete: { type: Boolean, required:true, default:false },
	complete_time: { type: Date },
	subtask: [subtaskSchema],
},{ timestamps: true});

const todoSchema = new Schema({
	title: { type: String, required: true },
	cards: [cardSchema]
},{ timestamps: true});

// Create Model & Export
const Todo = mongoose.model('Todo', todoSchema);


var router = express.Router();

//전체 리스트 받기
router.get('/', (req,res) => {
});

//컬럼 타이틀 갱신
router.post('/:id/column', (req,res) => {
});
//컬럼 추가
router.put('/column', (req,res) => {
	const title = req.body['title']
	const todo = new Todo({
		_id: new mongoose.Types.ObjectId(),
		title:title
	});
	console.log(todo)
	todo.save().then((result) => {
		console.log('Saved successfully');
		console.log(result);
		res.send({id:result._id,full_result:result});
	});
	
});
//컬럼 삭제
router.delete('/:id/column', (req,res) => {
});

//카드 내용 수정
router.post('/:column_id/:id/card', (req,res) => {
});
//카드 추가
router.put('/:column_id/card', (req,res) => {
});
//카드 삭제
router.delete('/:column_id/:id/card', (req,res) => {
});

export default router;