import { useState, useEffect } from "react";

const TABS = ["Subscriptions", "Fridge"];

const CATEGORIES_SUB = ["Entertainment", "Work", "Health", "Shopping", "Other"];
const CATEGORIES_FOOD = ["Vegetable", "Fruit", "Dairy", "Leftover", "Snack", "Other"];

const SAMPLE_SUBS = [
  { id: 1, name: "Netflix", amount: 649, renewal: "2026-05-15", status: "Active", category: "Entertainment" },
  { id: 2, name: "Spotify", amount: 119, renewal: "2026-05-20", status: "Active", category: "Entertainment" },
  { id: 3, name: "Canva Pro", amount: 499, renewal: "2026-06-01", status: "Cancelled", category: "Work" },
];

const SAMPLE_FOOD = [
  { id: 1, name: "Tomatoes", qty: 4, expiry: "2026-05-11", category: "Vegetable", status: "In Fridge" },
  { id: 2, name: "Milk", qty: 1, expiry: "2026-05-10", category: "Dairy", status: "In Fridge" },
  { id: 3, name: "Spinach", qty: 1, expiry: "2026-05-13", category: "Vegetable", status: "In Fridge" },
];

const RECIPES = [
  { name: "Tomato Sabzi", ingredients: ["Tomatoes", "Onion", "Spices"] },
  { name: "Palak Paneer", ingredients: ["Spinach", "Paneer", "Cream"] },
  { name: "Milk Chai", ingredients: ["Milk", "Tea", "Sugar"] },
  { name: "Tomato Soup", ingredients: ["Tomatoes", "Milk", "Butter"] },
];

function getDaysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function StatusBadge({ days, type }) {
  if (type === "sub") {
    if (days <= 3) return <span style={badge("var(--danger)")}>Renews in {days}d</span>;
    if (days <= 7) return <span style={badge("var(--warn)")}>In {days}d</span>;
    return <span style={badge("var(--ok)")}>{days}d left</span>;
  }
  if (days < 0) return <span style={badge("var(--danger)")}>EXPIRED</span>;
  if (days <= 1) return <span style={badge("var(--danger)")}>Today/Tomorrow!</span>;
  if (days <= 3) return <span style={badge("var(--warn)")}>{days}d left</span>;
  return <span style={badge("var(--ok)")}>{days}d left</span>;
}

function badge(color) {
  return {
    background: color + "22",
    color: color,
