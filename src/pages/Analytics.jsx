import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Analytics.css";
import {
  BarChart,
  Bar,
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

const Analytics = () => {
  const [posts, setPosts] = useState([]);

  // Chart data (static for now)
  const chartData = [
    { name: "Admin", posts: 5 },
    { name: "User", posts: 3 },
    { name: "Test", posts: 4 },
    { name: "Demo", posts: 2 },
  ];

  const headers = [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Author", key: "auther" },   // 👈 matches db.json
    { label: "Date", key: "createdAt" },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#ffbb28", "#ff8042"];

  // ✅ Fetch db.json posts
  useEffect(() => {
    fetch("http://localhost:3000/posts") // json-server
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="analytics-page">
      <Navbar />

      <main className="analytics-main">
        <header className="analytics-header">
          <h1>Blog Analytics</h1>
          <p>Insights into your blog's performance and activity</p>
        </header>

        {/* Charts */}
        <div className="charts-container">
          {/* Bar Chart */}
          <div className="chart-card">
            <h3>Posts per Author</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="posts" fill="#8884d8" name="Number of Posts" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="chart-card">
            <h3>Distribution</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="posts"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="posts-table-section">
          <h3>All Posts</h3>

          <div className="table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header.label}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.auther}</td>
                    <td>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination UI (static) */}
          <div className="pagination">
            <button className="page-btn">Previous</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;