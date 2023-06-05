function ValidateImage(value) {
    if (!value[0]) {
        return true;
    }
    const image = value[0];
    const imageSize = image.size / 1024 / 1024; // in MB
    const allowedTypes = ["image/jpeg", "image/png"];
    const isAllowedType = allowedTypes.includes(image.type);
    const isAllowedSize = imageSize <= 10;

    if (!isAllowedType) {
        return "Only JPG or PNG image types are allowed";
    }
    if (!isAllowedSize) {
        return "Image size should be less than 10MB";
    }
    return true;
}

export default ValidateImage;
