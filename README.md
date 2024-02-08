# Sample Project: Using TanStack Query and Zustand with DummyJSON API

Welcome to our sample project demonstrating the integration of TanStack Query and Zustand with the DummyJSON API. This README will provide you with an introduction to both libraries, as well as instructions on how to get started with our project.

## Introduction

### Tanstack Query

[Tanstack Query](https://tanstack.com/docs/) is a powerful data fetching and caching library for React applications. It provides a simple and concise API for fetching, caching, updating, and invalidating asynchronous data.

Key features of Tanstack Query include:

- **Automatic Caching**: Data fetched with Tanstack Query is automatically cached and updated when needed, reducing unnecessary network requests.
- **Query Invalidation**: Tanstack Query automatically invalidates queries when the underlying data changes, ensuring that your application always displays the latest data.
- **Server-side Rendering Support**: Tanstack Query provides built-in support for server-side rendering, making it easy to build fast and SEO-friendly applications.

### Zustand

[Zustand](https://github.com/pmndrs/zustand) is a small, fast, and scalable state management library for React applications. It provides a simple API for creating and managing state that integrates seamlessly with React's component model.

Key features of Zustand include:

- **Simplicity**: Zustand provides a minimal API surface, making it easy to learn and use.
- **Performance**: Zustand is designed to be fast, with minimal overhead compared to other state management solutions.
- **Scalability**: Zustand is suitable for both small and large applications, thanks to its efficient update mechanism and support for derived state.

### DummyJSON API

[DummyJSON](https://dummyjson.com/) is a simple API that allows you to generate placeholder JSON data based on a template. It's useful for prototyping and testing applications where you need realistic-looking data but don't have access to a real backend.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
$ yarn dev

```

## Usage

In this sample project, we demonstrate how to use Tanstack Query for data fetching and caching, Zustand for state management, and integrate with the DummyJSON API to fetch mock product data. The project allows you to:

- Fetch product data from the DummyJSON API.
- Implement pagination to navigate through multiple pages of product listings.
- Add new products
- Filter products by categories.
- Search for products.
