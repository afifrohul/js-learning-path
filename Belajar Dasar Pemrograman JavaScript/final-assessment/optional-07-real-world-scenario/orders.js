// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}

// TODO: buatlah variabel yang menampung data orders
let orders = [];

// TODO: selesaikan fungsi addOrder
function addOrder(customerName, items) {
  orders.push({
    id: generateUniqueId(),
    customerName: customerName,
    items: items,
    totalPrice: items.reduce((acc, item) => acc + item.price, 0),
    status: "Menunggu",
  });
}

// TODO: selesaikan fungsi updateOrderStatus
function updateOrderStatus(orderId, status) {
  const order = orders.find((order) => order.id === orderId);
  order.status = status;
}

// TODO: selesaikan fungsi calculateTotalRevenue dari order yang berstatus Selesai
function calculateTotalRevenue() {
  const finishedOrder = orders.filter((order) => order.status === "Selesai");

  return finishedOrder.reduce((acc, order) => acc + order.totalPrice, 0);
}

// TODO: selesaikan fungsi deleteOrder
function deleteOrder(id) {
  const objWithIdIndex = orders.findIndex(function (obj) {
    return obj.id === id;
  });

  if (objWithIdIndex > -1) {
    orders.splice(objWithIdIndex, 1);
  }
}

export {
  orders,
  addOrder,
  updateOrderStatus,
  calculateTotalRevenue,
  deleteOrder,
};
