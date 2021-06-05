const querys = {

    //User Queries
    GET_USERS: `SELECT * FROM public."Users"`,
    CREATE_USER: `INSERT INTO public."Users" (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
    GET_USERBYID: `SELECT * FROM public."Users" WHERE id = $1`,
    UPDATE_USER: `UPDATE public."Users" SET email = $1 WHERE id= $2 RETURNING *`,
    DELETE_USER: `DELETE FROM public."Users" WHERE id = $1`,

    //Validation Queries
    CHECKEMAIL: `SELECT * FROM public."Users" WHERE email = $1`,
    CHECKUSER: `SELECT * FROM public."Users" WHERE username = $1`,
    CHECKID: `SELECT * FROM public. "Users" WHERE id = $1`,
}

module.exports = querys;