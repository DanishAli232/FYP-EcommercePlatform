export const validateProductInput = ({
    name,
    category,
    price,
    countinstock,
    brand,
    description,
    image,
}) => {
    const errors = {};

    if (!name || name.trim() === "") {
        errors.name = "Name is required";
    }

    if (!description || description.trim() === "") {
        errors.description = "Description is required";
    }

    if (!brand || brand.trim() === "") {
        errors.brand = "Brand Name is required";
    }

    if (!countinstock || countinstock.trim() === "") {
        errors.countinstock = "CountinStock is required";
    }
    if (!category || category.trim() === "") {
        errors.category = "Category is required";
    }
    if (!price || price.trim() === "") {
        errors.price = "Price is required";
    }

    if (!image) {
        errors.image = "Image is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
        values: { name, category, price, countinstock, brand, description, image },
    };
};