import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {},
    defaultVariants: {},
  }
)

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input ref={ref} className={cn(inputVariants(), className)} {...props} />
  )
})
Input.displayName = "Input"

export { Input, inputVariants }
