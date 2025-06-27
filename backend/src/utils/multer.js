import multer from "multer";

const upload = multer({dest: './public/tmp'});

export default upload;