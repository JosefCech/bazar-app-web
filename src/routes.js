import React from "react";
import { Redirect } from "react-router-dom";
import { DefaultLayout } from "./layouts";
import StoreItems from "./StoreItems/StoreItems"

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
   component: StoreItems
  },
  {
    path: "store-items",
    layout: DefaultLayout,
    component: StoreItems
  }

    ];