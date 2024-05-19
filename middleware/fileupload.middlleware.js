import multer from "multer";
import path from 'path';

const disStorage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(path.resolve(), 'public/images'));
    },
    filename:(req,file,cb)=>{
        const name = Date.now() + '-' + file.originalname;
        cb(null,name);
    }
});

export const uploadFile = multer({
    storage:disStorage
});