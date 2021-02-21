import express from 'express';
import mongoose, { CallbackError, Schema } from 'mongoose';

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
	Todo.find((err,docs)=>{
		if(err){
			return res.status(500).json({ error: "database failure" }).send();
		}
		return res.send(docs);
	})
});

//컬럼 타이틀 갱신
router.post('/:id/column', (req,res) => {
	Todo.updateOne({ _id: req.params.id }, { $set:{title: req.body['title']} }, {new: true},(err,result)=>{
		if(err){
			return res.status(500).json({ error: "database failure" }).send();
		}
		return res.send({});
	});
});
//컬럼 추가
router.put('/column', (req,res) => {
	const title = req.body['title']
	const todo = new Todo({
		_id: new mongoose.Types.ObjectId(),
		title:title
	});
	todo.save().then((result) => {
		console.log(result.get('title'))
		res.send({id:result._id,new_title:result.get('title')});
	});
	
});
//컬럼 삭제
router.delete('/:id/column', (req,res) => {
	console.log(req.params.id)
	Todo.remove({ _id: req.params.id }, (err: CallbackError) => {
		if(err){
			return res.status(500).json({ error: "database failure" }).send();
		}
		res.send({})
	});
});

//카드 내용 수정
router.post('/card', (req,res) => {
	Todo.updateOne({ _id: req.body['column_id'], "cards._id" : req.body['id'] },
	{ "$set": { "cards.$.text": req.body['text'] } },
	{upsert: true},(err,result)=>{
		if(err){
			return res.status(500).json({ error: "database failure" }).send();
		}
		return res.send({});
	});
});
//카드 완료
router.post('/card/complete', (req,res) => {
	Todo.updateOne({ _id: req.body['column_id'], "cards._id" : req.body['id'] },
	{ "$set": { "cards.$.complete": req.body['complete'] } },
	{upsert: true},(err,result)=>{
		if(err){
			return res.status(500).json({ error: "database failure" }).send();
		}
		return res.send({});
	});
});
//카드 추가
router.put('/:column_id/card', (req,res) => {
	const card = {
		text: req.body['text']
	}
	Todo.updateOne({ _id: req.params.column_id }, { $push:{cards: card} }, {upsert: true},(err,result)=>{
		if(err){
			return res.status(500).json({ error: "database failure" }).send();
		}
		return res.send({});
	});
});
//카드 삭제
router.delete('/card', (req,res) => {
	Todo.updateOne({ _id: req.body['column_id'],  },
	{ "$pull": { cards : {_id:req.body['id']} } },
	{new: true},(err,result)=>{
		if(err){
			return res.status(500).json({ error: "database failure" }).send();
		}
		return res.send({});
	});
});

export default router;