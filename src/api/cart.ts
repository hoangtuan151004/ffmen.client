const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCart = async () => {
  const response = await fetch(`${API_URL}/api/cart/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Nếu sử dụng cookie cho xác thực
  });

  if (!response.ok) {
    throw new Error(`Lỗi lấy giỏ hàng: ${response.statusText}`);
  }
  return await response.json();
};

export const addToCart = async (product: {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}) => {
  const response = await fetch(`${API_URL}/api/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Lỗi thêm sản phẩm: ${response.statusText}`);
  }
  return await response.json();
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await fetch(`${API_URL}/api/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Lỗi cập nhật sản phẩm: ${response.statusText}`);
  }
  return await response.json();
};

export const deleteCartItem = async (productId: string) => {
  const response = await fetch(`${API_URL}/api/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Lỗi xóa sản phẩm: ${response.statusText}`);
  }
  return await response.json();
};

export const clearCart = async () => {
  const response = await fetch(`${API_URL}/api/cart/all`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Lỗi xóa toàn bộ giỏ hàng: ${response.statusText}`);
  }
  return await response.json();
};

export const searchCartItem = async (productId: string) => {
  const response = await fetch(`${API_URL}/api/cart/search/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Lỗi tìm kiếm sản phẩm: ${response.statusText}`);
  }
  return await response.json();
};
