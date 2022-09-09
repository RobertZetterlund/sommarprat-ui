import type { ReactNode } from "react";
import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { Grid } from "@visx/grid";

type TooltipData = {
  key: number;
  index: number;
  label: string;
};

export type BarStackProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  data?: { x: number; y: number; meta?: any }[];
  xLabel?: string;
  yLabel?: string;
  renderLabel?: (meta: any) => ReactNode;
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

const raw_data = {
  0: 588,
  1: 668,
  2: 565,
  3: 480,
  4: 431,
  5: 380,
  6: 402,
  7: 350,
  8: 328,
  9: 318,
  10: 347,
  11: 292,
  12: 243,
  13: 234,
  14: 219,
  15: 246,
  16: 198,
  17: 232,
  18: 227,
  19: 187,
  20: 208,
  21: 205,
  22: 179,
  23: 165,
  24: 158,
  25: 164,
  26: 160,
  27: 131,
  28: 148,
  29: 110,
  30: 136,
  31: 129,
  32: 137,
  33: 134,
  34: 139,
  35: 157,
  36: 132,
  37: 161,
  38: 156,
  39: 150,
  40: 140,
  41: 132,
  42: 132,
  43: 136,
  44: 120,
  45: 124,
  46: 104,
  47: 108,
  48: 87,
  49: 89,
  50: 95,
};

const _data = Object.entries(raw_data).map(([year, count]) => ({
  x: parseInt(year),
  y: count,
}));

export default function BarGraph({
  width,
  height,
  margin = defaultMargin,
  data = _data,
  xLabel = "År innan låten släpptes",
  yLabel = "Antalet spelningar",
}: BarStackProps) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

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

  xScale.range([0, xMaxDimension]);
  yScale.range([0, yMaxDimension]);

  const tickWidth = xMaxDimension / (xs.length - 1);
  const barWidthMultiplier = 0.9;

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
          <AxisBottom
            scale={xScale}
            top={yMaxDimension}
            label={xLabel}
            left={10}
          />
          <AxisLeft scale={yScale} left={0} label={yLabel} />

          <Group
            top={yMaxDimension}
            left={(-xMaxDimension / (data.length - 1)) * 0.5 + 10}
          >
            {data.map(({ x, y }, index) => (
              <Bar
                key={`bar-stack-${y}`}
                x={tickWidth * x}
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
                  //const left = bar.x + bar.width / 2;
                  showTooltip({
                    tooltipData: {
                      index,
                      label: `${x}-${y}`,
                      key: y,
                    },
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: tickWidth * index + margin.left,
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
          <div>
            <small>{tooltipData.label}</small>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
}
