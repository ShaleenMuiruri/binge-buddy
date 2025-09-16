// UI Component types

// Button types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

// Card types
export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

// Badge types
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

// Skeleton types
export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

// Carousel types
export interface CarouselProps {
  opts?: Record<string, unknown>;
  plugins?: unknown[];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: unknown) => void;
  className?: string;
  children: React.ReactNode;
}

export type CarouselContentProps = React.HTMLAttributes<HTMLDivElement>;

export type CarouselItemProps = React.HTMLAttributes<HTMLDivElement>;

export interface CarouselPreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export interface CarouselNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

// Select types
export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export type SelectTriggerProps = React.HTMLAttributes<HTMLButtonElement>;

export interface SelectValueProps {
  placeholder?: string;
}

export type SelectContentProps = React.HTMLAttributes<HTMLDivElement>;

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export type SelectLabelProps = React.HTMLAttributes<HTMLDivElement>;

export type SelectSeparatorProps = React.HTMLAttributes<HTMLDivElement>;
