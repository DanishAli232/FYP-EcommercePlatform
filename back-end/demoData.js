import bcrypt from "bcryptjs";

const data = {
    users: [{
            name: "Danish",
            email: "admin@example.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: true,
            country: "pakistan",
            city: "lahore",
            phoneno: "123457",
            idcard: "123",
        },
        {
            name: "John",
            email: "user@example.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: false,
            country: "pakistan",
            city: "lahore",
            phoneno: "12345",
            idcard: "123",
        },
    ],
    products: [{
            // _id: "1",
            name: "Nike Slim Shoes",
            slug: "nike-slim-shoes",
            category: "Shoes",
            price: 120,
            countinstock: 10,
            brand: "Nike",
            rating: 3,
            numReviews: 10,
            description: "high quality products",
            image: "/images/img1.jpg",
        },
        {
            // _id: "2",
            name: "addidas Slim Shoes",
            slug: "Addidas-slim-shoes",
            category: "Shoes",
            price: 150,
            countinstock: 0,
            brand: "addidas",
            rating: 4.5,
            numReviews: 10,
            description: "high quality products",
            image: "/images/img4.jpg",
        },
        {
            // _id: "3",
            name: "Servis Slim Shoes",
            slug: "Service-slim-shoes",
            category: "Shoes",
            price: 90,
            countinstock: 10,
            brand: "Servis",
            rating: 2.5,
            numReviews: 10,
            description: "high quality products",
            image: "/images/img2.jpg",
        },
        {
            // _id: "4",
            name: "Bata Slim Shoes",
            slug: "Bata-slim-shoes",
            category: "Shoes",
            price: 80,
            countinstock: 10,
            brand: "Bata",
            rating: 1.5,
            numReviews: 10,
            description: "high quality products",
            image: "/images/img5.jpg",
        },
        {
            // _id: "5",
            name: "Stylo Slim Shoes",
            slug: "Stylo-slim-shoes",
            category: "Shoes",
            price: 75,
            countinstock: 10,
            brand: "Bata",
            rating: 2.5,
            numReviews: 40,
            description: "high quality products",
            image: "/images/img-6.jpg",
        },
        {
            // _id: "6",
            name: "Ndure Slim Shoes",
            slug: "Ndure-slim-shoes",
            category: "Shoes",
            price: 150,
            countinstock: 10,
            brand: "Bata",
            rating: 4,
            numReviews: 30,
            description: "high quality products",
            image: "/images/img7.jpg",
        },
    ],
};

export default data;