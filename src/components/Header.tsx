
import { Check, CheckSquare, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { Task } from "@/types";

interface HeaderProps {
  categories: string[];
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void;
}

export function Header({ categories, onAddTask }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const handleAddTask = (task: Omit<Task, "id" | "createdAt">) => {
    onAddTask(task);
    setOpen(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <CheckSquare className="h-8 w-8 mr-2 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-primary">TaskFlow</h1>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <TaskForm 
              onSubmit={handleAddTask} 
              categories={categories} 
              onCancel={() => setOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-gradient-to-r from-primary/60 to-secondary/60 p-8 rounded-xl text-white">
        <h2 className="text-2xl font-semibold mb-2">Welcome to TaskFlow</h2>
        <p className="opacity-80">Organize your tasks efficiently and boost your productivity</p>
        <div className="flex space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>Track progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>Set priorities</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>Stay organized</span>
          </div>
        </div>
      </div>
    </div>
  );
}
