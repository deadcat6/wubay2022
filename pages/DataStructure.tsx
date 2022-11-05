
// @ts-ignore
type userType = {
  //id:
  username: string;
  password: string,
  email: string,
  firstname: string,
  lastname: string,
  phone: string,
  rating: number,
  myProducts: [productType],
  myOrders: [productType],
  usersChats: [chatType],
};

type productType = {
  //id:
  lister: userType
  lister_email: string,
  title: string,
  description: string,
  imagePath: ["/image.jpg"],
  createdTime: Date,
  paymentMethod: paymentMethodType,
  price: number,
  transaction: transactionType
}

enum transactionStages {
  none,
  payment,
  shipment,
  complete,
}
enum paymentMethodType {
  cash,
  zelle,
  ndwjhb,
  dwnajhu,
}

type transactionType = {
  //id:
  stage: transactionStages
  createdTime: Date
  buyer: userType
  seller: userType // always === product.lister
  paymentMethod: paymentMethodType
}

type chatType = {
  //id:
  targetUser: userType,
  content: [messageType]
}
type messageType = {
  //id:
  time: Date,
  owner: userType,
  content: string,
}
// js
const user = {
  //id:
  username: '',
  password: '',
  email: '',
  firstname: '',
  lastname: '',
  phone: '',
  rating: 0,
  myProducts: [],
  myOrders: [],
  usersChats: [],
}

const product = {
  //id:
  userId: '',
  userEmail: '',
  title: '',
  description: '',
  imagePath: [],
  updateTime: new Date(),
  paymentMethod: '',
  price: 0,
  transaction: {}
};

const transaction = {
  //id:
  stage: '',
  createdTime: new Date(),
  buyer: {},
  seller: {} ,// always === product.lister
  paymentMethod: '',
};

const chat = {
  //id:
  targetUser: {},
  content: []
};
const message = {
  //id:
  time: new Date(),
  owner: {},
  content: '',
};