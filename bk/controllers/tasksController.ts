import { Request, Response } from "express";
import mongoose from "mongoose";
import taskModel from "../models/taskModel";

const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskModel.find();
        res.json({ success: true, payload: tasks });
    }catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener las tareas", error });
    }
}

const addTask = async (req: Request, res: Response) => {
    try {
        const {text} = req.body;
        if (!text || text.trim() === "") {
            return res.status(400).json({ success: false, message: "El campo 'text' es requerido" });
          }
        const newTask = new taskModel({text});
        await newTask.save();
        res.status(201).json({ success: true, message: "La tarea se creó con éxito", payload: newTask });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al crear la nueva tarea", error });
        
    }
}

const editTask = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {text} = req.body;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Tarea no encontrada" });
          }
      
        const updatedTask = await taskModel.findByIdAndUpdate(id, { text }, { new: true });
        if (!updatedTask) {
        return res.status(404).json({ success: false, message: "Tarea no encontrada" });
        }
        res.json({ success: true, message: "La tarea se modificó con éxito", payload: updatedTask });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al modificar la tarea", error });
        
    }
}

const deleteTask = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "ID inválido" });
          }
        const deletedTask = await taskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ success: false, message: "Tarea no encontrada" });
          }
        res.json({ success: true, message: "La tarea se eliminó con éxito", payload: deletedTask });
        
    } catch (error) {
       res.status(500).json({ success: false, message: "Error al eliminar la tarea", error });
    
   }
}



export {getTasks, addTask, editTask, deleteTask} 