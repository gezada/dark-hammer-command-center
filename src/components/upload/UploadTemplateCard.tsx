
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useStore, Channel } from "@/lib/store";

interface UploadTemplateCardProps {
  template: {
    id: string;
    name: string;
    title: string;
    channelId: string | null;
    visibility: 'public' | 'unlisted' | 'private';
  };
  channels: Channel[];
  onApply: () => void;
}

export function UploadTemplateCard({ template, channels, onApply }: UploadTemplateCardProps) {
  const { removeTemplate } = useStore();

  // Find associated channel
  const channelInfo = template.channelId 
    ? channels.find(c => c.id === template.channelId) 
    : null;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeTemplate(template.id);
    toast.success("Template deleted");
  };

  const getVisibilityBadgeColor = () => {
    switch (template.visibility) {
      case 'public': return 'default';
      case 'unlisted': return 'secondary';
      case 'private': return 'outline';
      default: return 'default';
    }
  };

  return (
    <Card className="hover:shadow-md transition-all cursor-pointer" onClick={onApply}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <h4 className="font-medium">{template.name}</h4>
            <Button variant="ghost" size="sm" onClick={handleDelete} className="h-6 w-6 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-1">{template.title}</p>
          
          <div className="flex items-center justify-between">
            <Badge variant={getVisibilityBadgeColor() as any} className="text-xs">
              {template.visibility}
            </Badge>
            
            {channelInfo && (
              <div className="flex items-center space-x-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={channelInfo.thumbnail} alt={channelInfo.title} />
                  <AvatarFallback>{channelInfo.title[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{channelInfo.title}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          Apply Template
        </Button>
      </CardFooter>
    </Card>
  );
}
