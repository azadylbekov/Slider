import { expect } from "@jest/globals";
import { Slider } from "./Slider";

test("Missing root", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			slides: []
		})
	}).toThrowError(new Error("Missing required root parameter"));
})

test("Missing slides", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: "#slider"
		})
	}).toThrowError(new Error("Missing required slides parameter"));
})

test("Slides empty", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: "#slider",
			slides: []
		})
	}).toThrowError(new Error("Slides is empty"));
})

test("Type check delay", () => {
	expect(() => {
		new Slider({
			delay: "1500",
			width: 1000,
			height: 1000,
			root: "#slider",
			slides: [{ color: "#fff", text: "WHITE" }]
		})
	}).toThrowError(new Error("Parameter delay must be of type number"));
})

test("Type check width", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: "1000",
			height: 1000,
			root: "#slider",
			slides: [{ color: "#fff", text: "WHITE" }]
		})
	}).toThrowError(new Error("Parameter width must be of type number"));
})

test("Type check height", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: null,
			root: "#slider",
			slides: [{ color: "#fff", text: "WHITE" }]
		})
	}).toThrowError(new Error("Parameter height must be of type number"));
})

test("Type check root", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: 123,
			slides: [{ color: "#fff", text: "WHITE" }]
		})
	}).toThrowError(new Error("Parameter root must be of type string"));
})

test("Type check root # in the beginning", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: "123",
			slides: [{ color: "#fff", text: "WHITE" }]
		})
	}).toThrowError(new Error("Root must have # in the beginning"));
})

test("Type check slides", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: "#slider",
			slides: "hello"
		})
	}).toThrowError(new Error("Parameter slides must be an array"));
})

test("Slide types color presence", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: "#slider",
			slides: [{ text: "RED" }]
		})
	}).toThrowError(new Error("slide 0 is missing color property"));
})

test("Slide types text presence", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: "#slider",
			slides: [{ color: "#FFF" }]
		})
	}).toThrowError(new Error("slide 0 is missing text property"));
})

test("Slide types color type", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: "#slider",
			slides: [{ color: 123, text: "WHITE" }]
		})
	}).toThrowError(new Error("slide 0 color property must be of type string"));
})

test("Slide types text type", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: "#slider",
			slides: [{ color: "#FFF", text: 123 }]
		})
	}).toThrowError(new Error("slide 0 text property must be of type string"));
})

test("Slide types text type hex", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: "#slider",
			slides: [{ color: "#FFFfdsafasd", text: "123" }]
		})
	}).toThrowError(new Error("slide 0 color must be a hexadecimal"));
})

test("Slide types text length", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 1000,
			height: 1000,
			root: "#slider",
			slides: [{ color: "#FFF", text: "" }]
		})
	}).toThrowError(new Error("slide 0 must contain at least 1 character"));
})

test("Dimension check width", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 99,
			height: 1000,
			root: "#slider",
			slides: [{ color: "#FFF", text: "123" }]
		})
	}).toThrowError(new Error("Width must be at least 100"));
})

test("Dimension check height", () => {
	expect(() => {
		new Slider({
			delay: 1500,
			width: 100,
			height: 1,
			root: "#slider",
			slides: [{ color: "#FFF", text: "123" }]
		})
	}).toThrowError(new Error("Height must be at least 100"));
})

