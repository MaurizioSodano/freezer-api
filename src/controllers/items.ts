import { RequestHandler } from "express";
import { Item,Note } from "../models/item";
import { v4 as uuidv4 } from "uuid";
const items: Item[] = [];


export const createItem: RequestHandler = (req, res, next) => {
    const item=req.body as Note;
    const {title,quantity,weight,insertion_date,best_before_date} = item ;

    const id = uuidv4();
    
    const newItem = new Item(id, title,quantity,weight,insertion_date,best_before_date);
    items.push(newItem);

    res.status(201).json({ message: "created the item.", createItem: newItem });
};

export const getItems: RequestHandler = (req, res, next) => {
    res.status(201).json({ items: items });
}

export const updateItem:RequestHandler<{id:string}>=(req, res, next) => {
    const itemId=req.params.id;

    const updatedText=(req.body as {title:string}).title;
    const itemIndex=items.findIndex(item=>item.id===itemId)

    if (itemIndex<0){
        throw new Error("could not find item!");
    }
    items[itemIndex]=new Item(itemId,updatedText);

    res.status(201).json({message:"Updated",updateItem:items[itemIndex]});
}


export const deleteItem:RequestHandler<{id:string}>=(req, res, next) => {
    const itemId=req.params.id;

   
    const itemIndex=items.findIndex(item=>item.id===itemId)

    if (itemIndex<0){
        throw new Error("could not find item!");
    }
    items.splice(itemIndex,1)

    res.status(201).json({message:"deleted"});
}