
import { Check, Clock, Edit, Trash } from "lucide-react";
import { Task } from "@/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const priorityClasses = {
    low: "bg-task-low text-white",
    medium: "bg-task-medium text-white",
    high: "bg-task-high text-white",
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      task.completed ? "opacity-70" : "opacity-100"
    )}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={cn(
              "text-lg font-medium transition-all duration-200",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            <p className={cn(
              "text-sm text-muted-foreground mt-1",
              task.completed && "line-through"
            )}>
              {task.description}
            </p>
          </div>
          <Badge className={priorityClasses[task.priority]}>
            {task.priority}
          </Badge>
        </div>
        
        {task.dueDate && (
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span>Due {formatDistanceToNow(task.dueDate, { addSuffix: true })}</span>
          </div>
        )}
        
        <Badge variant="outline" className="mt-3">
          {task.category}
        </Badge>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleComplete(task.id)}
          className={cn(
            "text-muted-foreground hover:text-primary",
            task.completed && "text-primary"
          )}
        >
          <Check className="w-4 h-4 mr-1" />
          {task.completed ? "Completed" : "Complete"}
        </Button>
        
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            className="text-muted-foreground hover:text-primary"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
