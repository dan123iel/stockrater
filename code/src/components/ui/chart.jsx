"use client"
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

const THEMES = { light: "", dark: ".dark" }
const ChartContext = React.createContext(null)
function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error("useChart must be used within a <ChartContainer />")
  return context
}
const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = "chart-" + (id || uniqueId.replace(/:/g, ""))
  return (
    <ChartContext.Provider value={{ config }}>
      <div data-chart={chartId} ref={ref} className={cn("flex aspect-video justify-center text-xs", className)} {...props}>
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"
const ChartTooltip = RechartsPrimitive.Tooltip
const ChartTooltipContent = React.forwardRef(({ active, payload, className, indicator = "dot", hideLabel = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }, ref) => {
  const { config } = useChart()
  if (!active || !payload?.length) return null
  return (
    <div ref={ref} className={cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}>
      <div className="grid gap-1.5">
        {payload.map((item, index) => (
          <div key={item.dataKey} className="flex w-full items-center gap-2">
            {!false && <div className="h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />}
            <span className="text-muted-foreground">{item.name}</span>
            {item.value && <span className="ml-auto font-mono font-medium tabular-nums">{item.value.toLocaleString()}</span>}
          </div>
        ))}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltip"
const ChartLegend = RechartsPrimitive.Legend
const ChartLegendContent = React.forwardRef(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  if (!payload?.length) return null
  return (
    <div ref={ref} className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}>
      {payload.map((item) => (
        <div key={item.value} className="flex items-center gap-1.5">
          {!hideIcon && <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />}
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegend"
export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent }
