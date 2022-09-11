import type { ReactNode } from "react";
import { Fragment } from "react";
import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { Grid } from "@visx/grid";
import { Link } from "@remix-run/react";

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

export type BarChartProps<T> = {
  width: number;
  height: number;
  data: DataItem<T>[];
  renderLabel: (dataItem: DataItem<T>) => ReactNode;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  linksTo?: (dataItem: DataItem<T>) => string;
  customYMax?: number;
};

export const background = "#eaedff";
const defaultMargin = { top: 30, right: 30, bottom: 50, left: 60 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
  padding: 8,
};

let tooltipTimeout: number;

export default function BarChart<T>({
  width,
  height,
  margin = defaultMargin,
  data,
  xLabel,
  yLabel,
  renderLabel,
  color = "#B68CB8",
  linksTo,
  customYMax,
}: BarChartProps<T>) {
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
  const yMax = useMemo(
    () => (customYMax ? customYMax : Math.max(...ys)),
    [ys, customYMax]
  );
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
    <div className="relative overflow-auto rounded bg-[#F7F4F3]">
      <svg ref={containerRef} width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={xMaxDimension + tickWidth}
            height={yMaxDimension}
            stroke="#000"
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
            {data.map((item, index) => {
              const { x, y, meta } = item;

              const key = x + "-" + y;
              const child = (
                <Bar
                  x={tickWidth * x + xOffset}
                  y={-(y / yMax) * yMaxDimension}
                  height={(y / yMax) * yMaxDimension}
                  width={Math.abs(tickWidth * barWidthMultiplier)}
                  rx={2}
                  fill={color}
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
              );

              const link = linksTo ? linksTo(item) : null;

              return !link || width < 500 ? (
                <Fragment key={key}>{child}</Fragment>
              ) : link.includes("http") ? (
                <a key={key} target="_blank" rel="noreferrer" href={link}>
                  {child}
                </a>
              ) : (
                <Link key={key} to={link}>
                  {child}
                </Link>
              );
            })}
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
