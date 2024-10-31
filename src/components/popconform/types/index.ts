import { ReactNode } from "react";

export interface ConfirmationProps {
    title: string;
    onConfirm: () => void;
    children: ReactNode;
  }