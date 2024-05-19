import { body, validationResult } from "express-validator";

const validationMiddleware = async (req, res, next) => {

    const rules = [
        body('product-name').not().isEmpty().withMessage("Name Can not be Empty"),
        body('price').isFloat({gt:0}).withMessage("Enter a price greater than 0"),
        // body('image-url').isURL().withMessage('invalid Url')
        body('image-url').custom((value, {req})=>{
            if(!req.file){
                throw new Error('Image is Required');
            }
            return true;
        }),
    ];

    // Run all validation rules
    await Promise.all(rules.map(rule => rule.run(req)));

    // Extract validation errors
    const errors = validationResult(req);
console.log(errors)
    if (errors.isEmpty()) {
        // If there are no errors, proceed to the next middleware
        next();
    } else {
        // If there are errors, render the form again with error messages
        res.render('new-product', { errorMessage: errors.array()[0].msg });
    }
};

export default validationMiddleware;
