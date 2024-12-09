import { Request, Response } from "express";

const getTasks = (req: Request, res: Response) => {
    res.json({"Texto":"Respuesta de getTasks"})
}

const addTask = (req: Request, res: Response) => {
    res.json({"Texto":"Respuesta de addTask"})
}

const editTask = (req: Request, res: Response) => {
    res.json({"Texto":"Respuesta de editTask"})
}

const deleteTask = (req: Request, res: Response) => {
    res.json({"Texto":"Respuesta de deleteTasks"})
}



export {getTasks, addTask, editTask, deleteTask} 