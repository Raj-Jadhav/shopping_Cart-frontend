import { ReactNode } from "react";

export interface DialogProps{
    form: ReactNode;
    buttonText: string;
    title: string;
    description: string;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  photo?: string | null;
}