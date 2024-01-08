import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconClassName?: string; // New prop for icon className
}

const MetricCard = ({ title, value, icon, iconClassName }: MetricCardProps) => {
  // Dynamically create the icon component based on the provided icon prop
  const IconComponent = icon as React.ComponentType<any>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="space-y-3">
          {/* Render the dynamically created icon component with className */}
          {IconComponent && (
            <IconComponent size={24} className={cn("w-6 h-6", iconClassName)} />
          )}
          <span className="font-medium text-xl">{title}</span>
        </CardTitle>
        <CardDescription className="text-4xl font-bold">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default MetricCard;
