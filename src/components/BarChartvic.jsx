import React from "react";
import { PieChart, Pie, Sector, Tooltip } from "recharts";

const data = [
  { name: "1", value: 5 },
  { name: "2", value: 1 },
  { name: "3", value: 2 },
  { name: "4", value: 4 },
  { name: "5", value: 3 },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active) {
    return null;
  }

  const data = payload[0];
  return (
    <div className="custom-tooltip">
      <p>{`Name: ${data.name}`}</p>
      <p>{`Value: ${data.value}`}</p>
    </div>
  );
};

const BarChartvic = () => {
  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={120}
        dataKey="value"
        // Disabling default slice rendering with error handling
        isSectorActive={() => false}
        onError={(error) => console.error("Error rendering pie:", error)}
      >
        {({ data }) => (
          <g>
            {data.map((entry, index) => {
              try {
                // Attempt to create and render the path
                const path = getSpiralPath(entry, index);
                return (
                  <path
                    key={`path-${index}`}
                    d={path}
                    stroke={({ index }) =>
                      index % 2 === 0 ? "#C2C2F0" : "#A9A9F5"
                    }
                    strokeWidth={20}
                    fill="none"
                  />
                );
              } catch (error) {
                console.error("Error generating path:", error);
                // Optionally render a placeholder element
                return (
                  <text key={`error-${index}`} x={200} y={200}>
                    Error
                  </text>
                );
              }
            })}
            <Tooltip content={<CustomTooltip />} />
          </g>
        )}
      </Pie>
    </PieChart>
  );
};

// Function to generate spiral path for each slice
function getSpiralPath(entry, index) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = entry;
  // Adjust these values as needed to control spiral shape
  const spiralFactor = 0.8; // Controls spiral tightness
  const angleOffset = Math.PI / (data.length * 2); // Adjusts angle spacing

  return describeArc(
    cx,
    cy,
    innerRadius + (outerRadius - innerRadius) * spiralFactor * index,
    outerRadius,
    startAngle + angleOffset * index,
    endAngle + angleOffset * index
  );
}

// Helper function to describe an SVG arc path
function describeArc(x, y, radius, startAngle, endAngle, clockwise = false) {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
  const path = `M ${start.x} ${
    start.y
  } A ${radius} ${radius} 0 ${largeArcFlag} ${clockwise ? 1 : 0} ${end.x} ${
    end.y
  }`;
  return path;
}

// Helper function to convert polar coordinates to cartesian
function polarToCartesian(x, y, radius, angle) {
  return {
    x: x + radius * Math.cos(angle),
    y: y + radius * Math.sin(angle),
  };
}

export default BarChartvic;
