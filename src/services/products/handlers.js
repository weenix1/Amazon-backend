import pool from "../../db/connect.js";

const getAll = async (_req, res, _next) => {
  try {
    const data = await pool.query("SELECT * FROM products ORDER BY id ASC;");
    res.send(data.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getById = async (req, res, _next) => {
  try {
    const data = await pool.query("SELECT * FROM products WHERE id=$1", [
      req.params.id,
    ]);
    /**
     *
     *  data.rows is an array of objects
     * if its empty it means no match!
     * we check if its empty we will send 404
     * else we will send first object found as response
     */

    if (data.rows.length === 0) {
      res.status(400).send("product not found");
    } else {
      res.send(data.rows[0]);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createUser = async (req, res, _next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const data = await pool.query(
      `INSERT INTO products( name, description, brand, image_url, price, category) VALUES( '${name}', '${description}', '${brand}', '${image_url}','${price}','${category}') RETURNING *;`
      /* [name, last_name, email] */
    );

    res.send(data.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const data = await pool.query(
      "UPDATE products SET name=$1,last_name=$2,email=$3 WHERE id=$4 RETURNING *;",
      [name, last_name, email, req.params.id]
    );
    res.send(data.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const productsHandler = {
  getAll,
  getById,
  createUser,
  updateUserById,
  deleteUserById,
};

export default productsHandler;
