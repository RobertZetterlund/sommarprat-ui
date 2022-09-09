import type { ReactNode } from "react";
import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { Grid } from "@visx/grid";

type DataItem<T> = {
  x: number;
  y: number;
  meta?: T;
};

type TooltipData<T> = {
  key: number;
  index: number;
  item: DataItem<T>;
};

export type BarStackProps<T> = {
  width: number;
  height: number;
  data: DataItem<T>[];
  renderLabel: (dataItem: DataItem<T>) => ReactNode;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  xLabel?: string;
  yLabel?: string;
};

export const background = "#eaedff";
const defaultMargin = { top: 30, right: 30, bottom: 50, left: 60 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

let tooltipTimeout: number;

export default function BarGraph<T>({
  width,
  height,
  margin = defaultMargin,
  data,
  xLabel,
  yLabel,
  renderLabel,
}: BarStackProps<T>) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData<T>>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });

  // bounds
  const xMaxDimension = width - margin.left - margin.right;
  const yMaxDimension = height - margin.top - margin.bottom;

  const xs = useMemo(() => data.map((p) => p.x), [data]);
  const xMax = useMemo(() => Math.max(...xs), [xs]);
  const xMin = useMemo(() => Math.min(...xs, 0), [xs]);
  const ys = useMemo(() => data.map((p) => p.y), [data]);
  const yMax = useMemo(() => Math.max(...ys), [ys]);
  const yMin = useMemo(() => Math.min(...ys, 0), [ys]);

  const xScale = useMemo(() => {
    return scaleLinear<number>({
      domain: [xMin, xMax],
    });
  }, [xMax, xMin]);

  const yScale = useMemo(() => {
    return scaleLinear<number>({
      domain: [yMax, yMin],
    });
  }, [yMax, yMin]);

  const tickWidth = xMaxDimension / (xMax - xMin);
  const xOffset = Math.abs(tickWidth * xMin);
  const barWidthMultiplier = 0.9;
  yScale.range([0, yMaxDimension]);
  xScale.range([0, xMaxDimension]);

  return (
    <div className="relative overflow-auto rounded bg-white">
      <svg ref={containerRef} width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={xMaxDimension + tickWidth}
            height={yMaxDimension}
            stroke="black"
            strokeOpacity={0.1}
          />
          {xLabel && (
            <AxisBottom
              scale={xScale}
              top={yMaxDimension}
              label={xLabel}
              left={10}
            />
          )}
          {yLabel && <AxisLeft scale={yScale} left={0} label={yLabel} />}

          <Group
            top={yMaxDimension}
            left={(-xMaxDimension / (data.length - 1)) * 0.5 + 10}
          >
            {data.map(({ x, y, meta }, index) => (
              <Bar
                key={`bar-stack-${y}`}
                x={tickWidth * x + xOffset}
                y={-(y / yMax) * yMaxDimension}
                height={(y / yMax) * yMaxDimension}
                width={tickWidth * barWidthMultiplier}
                fill={"#483d61"}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
                onMouseMove={(event) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  // TooltipInPortal expects coordinates to be relative to containerRef
                  // localPoint returns coordinates relative to the nearest SVG, which
                  // is what containerRef is set to in this example.
                  const eventSvgCoords = localPoint(event);
                  showTooltip({
                    tooltipData: {
                      index,
                      key: y,
                      item: {
                        x,
                        y,
                        meta,
                      },
                    },
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: tickWidth * x + margin.left + xOffset,
                  });
                }}
              />
            ))}
          </Group>
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          {tooltipData.item && renderLabel(tooltipData.item)}
        </TooltipInPortal>
      )}
    </div>
  );
}
