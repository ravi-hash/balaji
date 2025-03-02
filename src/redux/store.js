import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/orderSlice";
import checkoutReducer from "./slice/checkoutSlice";
import adminReducer from "./slice/adminSlice"; // Import the admin reducer
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";



// Configuring redux-persist for persisting the `admin` slice
const adminPersistConfig = {
  key: "admin",
  storage, // or sessionStorage if you prefer session-based persistence
};

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  orders: orderReducer,
  checkout: checkoutReducer,
  admin: persistReducer(adminPersistConfig, adminReducer), // Persist only the admin reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store); // Create persistor object for use in the app
export default store;
