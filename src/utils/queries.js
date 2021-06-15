const querys = {

    //User Queries
    GET_USERS: `SELECT * FROM public."Users"`,
    CREATE_USER: `INSERT INTO public."Users" (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
    GET_USERBYID: `SELECT * FROM public."Users" WHERE id = $1`,
    GET_USERBYUSERNAME: `SELECT * FROM public."Users" WHERE username = $1`,
    UPDATE_USER: `UPDATE public."Users" SET email = $1 WHERE id= $2 RETURNING *`,
    DELETE_USER: `DELETE FROM public."Users" WHERE id = $1`,

    //LogIn
    LOGIN: `SELECT * FROM public. "Users" WHERE username = $1 AND password= $2`,

    //Product Queries
    GET_PRODUCTS: `SELECT * FROM public."Products"`,
    CREATE_PRODUCT: `INSERT INTO public."Products" (name, price, description) VALUES ($1, $2, $3) RETURNING *`,
    GET_PRODUCTBYID:`SELECT * FROM public."Products" WHERE id = $1`,
    UPDATE_PRODUCT: `UPDATE public."Products" SET name = $1, price = $2, description = $3 WHERE id= $4 RETURNING *`,
    DELETE_PRODUCT: `DELETE FROM public."Products" WHERE id = $1`,

    //Validation Queries
    CHECKEMAIL: `SELECT * FROM public."Users" WHERE email = $1`,
    CHECKUSER: `SELECT * FROM public."Users" WHERE username = $1`,
    CHECKPASS:`SELECT * FROM public."Users" WHERE password = $1`,
    CHECKID: `SELECT * FROM public. "Users" WHERE id = $1`,
    CHECKPROD: `SELECT * FROM public. "Products" WHERE name=$1`,
}

module.exports = querys;
