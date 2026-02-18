import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      display: "text-4xl md:text-5xl font-semibold tracking-tight",
      h1: "text-3xl font-semibold tracking-tight",
      h2: "text-2xl font-semibold tracking-tight",
      h3: "text-xl font-semibold tracking-tight",
      h4: "text-lg font-semibold tracking-tight",
      body: "text-base leading-relaxed",
      "body-sm": "text-sm leading-relaxed",
      caption: "text-xs leading-snug",
      overline: "text-xs uppercase tracking-wider",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    variant: "body",
    tone: "default",
  },
})

function Text({
  className,
  variant,
  tone,
  align,
  truncate,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="text"
      className={cn(textVariants({ variant, tone, align, truncate }), className)}
      {...props}
    />
  )
}

export { Text, textVariants }
