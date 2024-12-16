
// //import hàm cấu hình slice 
// import { configureStore } from '@reduxjs/toolkit';
// //import slice counter
// import counterReducer from './slices/counterslice';

// //tạo và cấu hình store
// export const store = configureStore({
//   reducer: {
//     //lưu slice Couter vào store
//     counter: counterReducer,
//   },
// });
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartslice.js';

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})