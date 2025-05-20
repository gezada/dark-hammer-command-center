
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStore, Channel } from "@/lib/store";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadTemplateFormProps {
  isOpen: boolean;
  onClose: () => void;
  channels: Channel[];
  initialValues?: {
    title: string;
    description: string;
    tags: string[];
    visibility: 'public' | 'unlisted' | 'private';
    scheduledDate: Date | undefined;
  };
}

export function UploadTemplateForm({ 
  isOpen, 
  onClose, 
  channels,
  initialValues 
}: UploadTemplateFormProps) {
  const { addTemplate } = useStore();
  const [templateName, setTemplateName] = useState("");
  const [channelId, setChannelId] = useState<string | null>(null);
  
  // Use initial values if provided, otherwise use defaults
  const [title] = useState(initialValues?.title || "");
  const [description] = useState(initialValues?.description || "");
  const [tags] = useState(initialValues?.tags || []);
  const [visibility] = useState(initialValues?.visibility || "public");
  const [scheduledDate] = useState(initialValues?.scheduledDate);

  const handleSave = () => {
    if (!templateName.trim()) {
      toast.error("Template name is required");
      return;
    }

    const newTemplate = {
      id: uuidv4(),
      name: templateName,
      channelId: channelId,
      title,
      description,
      tags,
      visibility,
      scheduledDate
    };

    addTemplate(newTemplate);
    toast.success("Template created successfully");
    setTemplateName("");
    setChannelId(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Template</DialogTitle>
          <DialogDescription>
            Save your current video settings as a reusable template
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              placeholder="E.g., Tutorial Video Settings"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-channel">Associated Channel (Optional)</Label>
            <Select value={channelId || ""} onValueChange={setChannelId}>
              <SelectTrigger>
                <SelectValue placeholder="Template for all channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Template for all channels</SelectItem>
                {channels.map(channel => (
                  <SelectItem key={channel.id} value={channel.id}>
                    {channel.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Associating with a channel makes this template appear only for that channel
            </p>
          </div>

          <div className="space-y-2">
            <Label>Template Preview</Label>
            <div className="bg-muted/30 p-3 rounded-md text-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">Title:</span>
                <span className="text-muted-foreground">{title || "(Empty)"}</span>
              </div>
              <div className="flex justify-between items-start mt-2">
                <span className="font-medium">Description:</span>
                <span className="text-muted-foreground text-right max-w-[70%] line-clamp-1">
                  {description || "(Empty)"}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">Tags:</span>
                <span className="text-muted-foreground">{tags.length > 0 ? tags.join(", ") : "(None)"}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">Visibility:</span>
                <span className="text-muted-foreground capitalize">{visibility}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
