import pool from "../../db/connect.js";
import path from "path";

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

const createUserCloud = async (req, res, _next) => {
  try {
    const cloudImg = req.file.path;
    const { name, description, brand, image_url, price, category } = req.body;
    const data = await pool.query(
      `INSERT INTO products( name, description, brand, image_url, price, category) VALUES( '${name}', '${description}', '${brand}', '${cloudImg}','${price}','${category}') RETURNING *;`
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
      "UPDATE products SET name=$1,description=$2,brand=$3,image_url=$4,price=$5,category=$6 WHERE id=$7 RETURNING *;",
      [name, description, brand, image_url, price, category, req.params.id]
    );
    res.send(data.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUserByIdImage = async (req, res, next) => {
  try {
    const cloudImg = req.file.path;

    const data = await pool.query(
      "UPDATE products SET image_url=$1 WHERE id=$2 RETURNING *;",
      [cloudImg, req.params.id]
    );

    res.send(data.rows[0]);
  } catch (error) {
    next(error);
    console.log(error);
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
  createUserCloud,
  updateUserById,
  updateUserByIdImage,
  deleteUserById,
};

export default productsHandler;
