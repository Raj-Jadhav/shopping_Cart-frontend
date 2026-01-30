import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogProps } from "@/lib/types";


export default function ReusableDialog({form, buttonText, title, description}: DialogProps){
    return (
        <Dialog>
  <DialogTrigger className="rounded p-2 border">{buttonText}</DialogTrigger>
  <DialogContent className="dark">
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
        {description}
      </DialogDescription>
    </DialogHeader>

        {form}
  </DialogContent>
</Dialog>
    )
}