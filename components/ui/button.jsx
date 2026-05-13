import * as React from "react"
import { cva } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#D6BD98] text-[#040D12] font-semibold border-[#D6BD98] hover:bg-[#c9ad87]",
        outline:
          "border-[rgba(147,177,166,0.3)] text-[#93B1A6] bg-transparent hover:border-[#D6BD98] hover:text-[#D6BD98]",
        secondary:
          "bg-[#183D3D] text-[#E8F5E9] border-[rgba(147,177,166,0.2)] hover:bg-[#1e4a4a]",
        ghost:
          "text-[#93B1A6] hover:bg-[rgba(147,177,166,0.08)] hover:text-[#E8F5E9] border-transparent",
        destructive:
          "bg-[rgba(248,113,113,0.15)] text-[#f87171] border-[rgba(248,113,113,0.4)] hover:bg-[rgba(248,113,113,0.25)]",
        link: "text-[#D6BD98] underline-offset-4 hover:underline border-transparent",
      },
      size: {
        default: "h-8 gap-1.5 px-2.5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-3",
        icon: "size-8",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)]",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
