"use client";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PostForm from "@/components/post/pin-form";

interface PinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coords: { lat: number; lng: number } | null;
  userID: string;
}

export function PinDialog({ open, onOpenChange, coords, userID }: PinDialogProps) {
  if (!coords) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-center">Drop A Pin</DialogTitle>
        <DialogDescription>
          Share a fleeting thought with the world.
        </DialogDescription>
        <PostForm
          userId={userID}
          latitude={coords.lat}
          longitude={coords.lng}
          region="Americas"
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
