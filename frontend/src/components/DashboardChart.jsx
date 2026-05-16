import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/**
 * Dashboard Chart Component
 * Displays various chart types for analytics
 */
export default function DashboardChart({
  type = "bar",
  data = [],
  title = "",
  height = 300,
}) {
  if (!data || data.length === 0) {
    return (
      <div
        className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#F59E0B",
    "#10B981",
    "#EF4444",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {title && (
        <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      )}

      <ResponsiveContainer width="100%" height={height}>
        {type === "bar" && (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        )}

        {type === "line" && (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        )}

        {type === "pie" && (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: $${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
