
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "@/types";
import { Header } from "@/components/Header";
import { TaskList } from "@/components/TaskList";
import { TaskProgress } from "@/components/TaskProgress";
import { CategoryForm } from "@/components/CategoryForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TaskForm } from "@/components/TaskForm";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Folder, Tag } from "lucide-react";

// Sample data for initial state
const sampleTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Complete project proposal",
    description: "Write the first draft of the project proposal document",
    completed: false,
    priority: "high",
    category: "Work",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Go grocery shopping",
    description: "Buy fruits, vegetables, and weekly essentials",
    completed: true,
    priority: "medium",
    category: "Personal",
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Review marketing plan",
    description: "Check the new marketing strategy for next quarter",
    completed: false,
    priority: "medium",
    category: "Work",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Schedule dentist appointment",
    description: "Call dentist to schedule annual checkup",
    completed: false,
    priority: "low",
    category: "Health",
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Water plants",
    description: "Don't forget to water indoor and balcony plants",
    completed: false,
    priority: "low",
    category: "Home",
    createdAt: new Date(),
  },
];

const initialCategories = ["Work", "Personal", "Health", "Home"];

const Index = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [editTask, setEditTask] = useState<Task | undefined>(undefined);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  // Add a new task
  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date(),
    };
    
    setTasks((prev) => [newTask, ...prev]);
    toast({
      title: "Task added",
      description: "Your new task has been created successfully.",
    });
  };
  
  // Toggle task completion
  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  // Edit task
  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setEditDialogOpen(true);
  };
  
  // Update task
  const updateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editTask) return;
    
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editTask.id
          ? { ...task, ...taskData }
          : task
      )
    );
    
    setEditDialogOpen(false);
    setEditTask(undefined);
    toast({
      title: "Task updated",
      description: "Task has been updated successfully.",
    });
  };
  
  // Delete task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Your task has been deleted.",
      variant: "destructive",
    });
  };
  
  // Add category
  const addCategory = (name: string) => {
    if (categories.includes(name)) {
      toast({
        title: "Category already exists",
        description: "Please enter a unique category name.",
        variant: "destructive",
      });
      return;
    }
    
    setCategories((prev) => [...prev, name]);
    toast({
      title: "Category added",
      description: `Category "${name}" has been added.`,
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header categories={categories} onAddTask={addTask} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="tasks" className="flex gap-2">
                  <Tag className="h-4 w-4" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex gap-2">
                  <Folder className="h-4 w-4" />
                  Categories
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tasks" className="space-y-6">
                <TaskList
                  tasks={tasks}
                  onToggleComplete={toggleComplete}
                  onEdit={handleEditTask}
                  onDelete={deleteTask}
                />
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CategoryForm onSubmit={addCategory} />
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">Categories</h2>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge key={category} variant="outline" className="py-2">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    {categories.length === 0 && (
                      <p className="text-muted-foreground text-sm">
                        No categories yet. Add your first category to organize tasks.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <TaskProgress tasks={tasks} />
          </div>
        </div>
      </div>
      
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {editTask && (
            <TaskForm
              onSubmit={updateTask}
              categories={categories}
              initialTask={editTask}
              onCancel={() => setEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
