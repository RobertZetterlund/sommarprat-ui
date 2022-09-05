import React, { useState } from "react";

const raw_data = {
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

const data = Object.entries(raw_data).map(([year, count]) => ({
  year: parseInt(year),
  count: count,
}));

export const VerticalExample = () => {
  const [selectedYear, setSelectedYear] = useState();

  return (
    <div className="relative rounded bg-slate-200 p-4">
      <div className="absolute top-4 right-4 flex h-20 w-1/3 items-center bg-slate-700 bg-opacity-40 p-2">
        {selectedYear && (
          <div>
            {data[selectedYear - 1].count} låtar spelades och släpptes{" "}
            {data[selectedYear - 1].year} år tidigare.
          </div>
        )}
      </div>
      <div className="flex w-full items-end justify-between gap-0.5">
        {data.map(({ year, count }) => (
          <div
            key={year}
            className="flex-grow"
            onMouseOver={(e) => {
              setSelectedYear(year);
            }}
            onMouseLeave={() => setSelectedYear(undefined)}
          >
            <div
              className="bg-blue-300 transition-colors duration-200"
              style={{
                height: `${count / 2}px`,
                backgroundColor: year === selectedYear ? "red" : undefined,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
