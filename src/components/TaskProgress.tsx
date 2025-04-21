
import { Progress } from "./ui/progress";
import { Task } from "@/types";
import { Check, Clock, ListChecks } from "lucide-react";

interface TaskProgressProps {
  tasks: Task[];
}

export function TaskProgress({ tasks }: TaskProgressProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  
  const highPriorityTasks = tasks.filter(task => task.priority === "high").length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">Task Progress</h2>
      
      <div className="space-y-5">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Completion Rate</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <ListChecks className="h-5 w-5 text-primary mb-1" />
            <span className="text-xl font-semibold">{totalTasks}</span>
            <span className="text-xs text-muted-foreground">Total Tasks</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <Check className="h-5 w-5 text-green-500 mb-1" />
            <span className="text-xl font-semibold">{completedTasks}</span>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <Clock className="h-5 w-5 text-task-high mb-1" />
            <span className="text-xl font-semibold">{highPriorityTasks}</span>
            <span className="text-xs text-muted-foreground">High Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
}
