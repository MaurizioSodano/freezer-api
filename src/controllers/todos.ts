import { RequestHandler } from "express";
import { Todo } from "../models/todo";
import { v4 as uuidv4 } from "uuid";
const TODOS: Todo[] = [];


export const createTodo: RequestHandler = (req, res, next) => {

    const text = (req.body as { text: string }).text;
    const id = uuidv4();
    
    const newTodo = new Todo(id, text);
    TODOS.push(newTodo);

    res.status(201).json({ message: "created the todo.", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(201).json({ todos: TODOS });
}

export const updateTodo:RequestHandler<{id:string}>=(req, res, next) => {
    const todoId=req.params.id;

    const updatedText=(req.body as {text:string}).text;
    const todoIndex=TODOS.findIndex(todo=>todo.id===todoId)

    if (todoIndex<0){
        throw new Error("could not find todo!");
    }
    TODOS[todoIndex]=new Todo(todoId,updatedText);

    res.status(201).json({message:"Updated",updateTodo:TODOS[todoIndex]});
}


export const deleteTodo:RequestHandler<{id:string}>=(req, res, next) => {
    const todoId=req.params.id;

   
    const todoIndex=TODOS.findIndex(todo=>todo.id===todoId)

    if (todoIndex<0){
        throw new Error("could not find todo!");
    }
    TODOS.splice(todoIndex,1)

    res.status(201).json({message:"deleted"});
}