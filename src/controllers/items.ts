import { RequestHandler } from "express";
import { Item, Note } from "../models/item";
import { v4 as uuidv4 } from "uuid";
import { Schema, model } from "mongoose";

const items: Item[] = [];

//SCHEMA
const itemsSchema = new Schema({
    id: String,
    title: String,
    quantity: Number,
    weight: Number,
    insertion_date: String,
    best_before_date: String
});
//MODEL

const ItemModel = model("Item", itemsSchema);

export const createItem: RequestHandler = (req, res) => {
    const item = req.body as Note;
    const { title, quantity, weight, insertion_date, best_before_date } = item;

    const id = uuidv4();

    const newItem = new Item(id, title, quantity, weight, insertion_date, best_before_date);

    const itemModel = new ItemModel({
        title: newItem.title,
        id: newItem.id,
        quantity: newItem.quantity,
        weight: newItem.weight,
        insertion_date: newItem.insertion_date,
        best_before_date: newItem.best_before_date,
    });
    itemModel.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).json({ message: "created the item.", createItem: newItem });
        }
    });


};

export const getItems: RequestHandler = (req, res) => {
    ItemModel.find({}, (err, freezerItems) => {
        if (!err) {
            res.status(201).send(freezerItems);
        } else {
            res.send(err);
        }
    });

}

export const updateItem: RequestHandler<{ id: string }> = (req, res) => {
    const itemId = req.params.id;
    ItemModel.updateOne({
        id: itemId
    }, {
        $set: req.body
    },
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Successfully updated note");
            }
        })
}


export const deleteItem: RequestHandler<{ id: string }> = (req, res) => {
    const itemId = req.params.id;
    console.log("deleting id:" + itemId);

    ItemModel.deleteOne({
        id: itemId
    },
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Successfully deleted");
            }
        })
}