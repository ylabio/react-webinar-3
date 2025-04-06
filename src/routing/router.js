import { createBrowserRouter, createRoutesFromElements, Link, Route } from "react-router";
import Product from "../app/product";
import Main from "../app/main";
import NotFound from "../app/not-found";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Main/>} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/*" element={<NotFound/>} />
    </>
  )
)
