// we will be using this dummy data,
// don't worry, you can find this data in the git repo
// you can find the git repo link in the description ;)

export const categories = [
  {
    id: null,
    title: "All Category",
  },
  {
    id: 1,
    title: "Classic Coffee",
  },
  {
    id: 2,
    title: "Milk-Based Specialties",
  },
  {
    id: 3,
    title: "Alternative Brews",
  },
];

export const coffeeItems = [
  {
    id: 1,
    name: "Black Coffee",
    price: "25.50",
    volume: "116 ml",
    stars: "4.6",
    image: require("../assets/images/coffee1.png"),
    categoryId: 1,
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },
  {
    id: 2,
    name: "Americano",
    price: "15.10",
    volume: "100 ml",
    stars: "4.6",
    image: require("../assets/images/coffee6.png"),
    categoryId: 1,
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },

  {
    id: 3,
    name: "Cappuccino",
    price: "15.50",
    volume: "110 ml",
    stars: "4.3",
    image: require("../assets/images/coffee2.png"),
    categoryId: 2,
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },

  {
    id: 4,
    name: "Espresso",
    price: "30.00",
    volume: "100 ml",
    stars: "4.0",
    image: require("../assets/images/coffee3.png"),
    categoryId: 2,
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },

  {
    id: 5,
    name: "Latte",
    price: "10.30",
    volume: "80 ml",
    stars: "3.5",
    image: require("../assets/images/coffee4.png"),
    categoryId: 2,
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },

  {
    id: 6,
    name: "Mocha",
    price: "23.10",
    volume: "120 ml",
    stars: "4.7",
    image: require("../assets/images/coffee5.png"),
    categoryId: 2,
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },
  {
    id: 7,
    name: "Cortado",
    price: "23.10",
    volume: "120 ml",
    stars: "4.3",
    image: require("../assets/images/coffee7.png"),
    categoryId: 2,
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },
  {
    id: 8,
    name: "Caramel Macchiato",
    price: "25.30",
    volume: "110 ml",
    stars: "4.8",
    image: require("../assets/images/coffee8.png"),
    categoryId: 2,
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },

  {
    id: 9,
    name: "Matcha",
    price: "25.30",
    volume: "120 ml",
    stars: "4.8",
    image: require("../assets/images/coffee9.png"),
    categoryId: 3,
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },
  {
    id: 10,
    name: "Hot Chocolate",
    price: "25.30",
    volume: "120 ml",
    stars: "4.7",
    image: require("../assets/images/coffee10.png"),
    categoryId: 3,
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },
];
