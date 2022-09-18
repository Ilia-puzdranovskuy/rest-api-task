const Router = require('express');
const router = new Router();

/////////////////////////////////////////////////////////////
////////AUTH/////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegiste:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: string
 *           description: The user phone
 *         password:
 *           type: string
 *           description: The user password. In DB hashed. Min 4  characters
 *       example:
 *         name: Alex
 *         phone: "+380689900"
 *         email: qwrty@gmail.com
 *         password: "1234"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password. In DB hashed. Min 4  characters
 *       example:
 *         email: qwrty@gmail.com
 *         password: "1234"
 */

 /**
  * @swagger
  * tags:
  *   name: auth
  *   description: auth Rest-api
  */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegiste'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *          "application/json": {}
 *       422:
 *         description: Unprocessable Entity
 */

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Login user
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *          "application/json": {}
 *       422:
 *         description: Unprocessable Entity
 *       404:
 *         description: User not found
 */


/**
 * @swagger
 * /api/users/me:
 *  get:
 *    summary: get Curent User
 *    tags: [auth]
 *    security:
 *       - Authorization: []
 *    responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *          "application/json": {}
 *       422:
 *         description: Unprocessable Entity
 *       404:
 *         description: User not found
 */






/////////////////////////////////////////////////////////////
////////ITEMS////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/**
 * @swagger
 * components:
 *   schemas:
 *     newItem:
 *       type: object
 *       required:
 *         - title
 *         - price
 *       properties:
 *         title:
 *           type: string
 *           description: The item title
 *         price:
 *           type: string
 *           description: The item price
 *       example:
 *         title: Notebook
 *         price: "550.00"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateItem:
 *       type: object
 *       required:
 *         - title
 *         - price
 *       properties:
 *         title:
 *           type: string
 *           description: The item title
 *         price:
 *           type: string
 *           description: The item price
 *       example:
 *         title: Notebook
 *         price: "550.00"
 */


 /**
  * @swagger
  * tags:
  *   name: items
  *   description: items Rest-api
  */

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [items]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/newItem'
 *     responses:
 *       200:
 *         description: The item was successfully created
 *         content:
 *          "application/json": {}
 *       422:
 *         description: Unprocessable Entity
 *       404:
 *         description: Not found
 *       401:
 *         description:  Unauthorized
 */


/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Search items
 *     tags: [items]
 *     parameters: 
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Item title,
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User Id
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Order by price or time. Value "price" "orcreatedAt". Default=createdAt
 *       - in: query
 *         name: orderType
 *         schema:
 *           type: string
 *         description: Order by asc or time. Value "asc" "desc".  Default=desc
 *     responses:
 *       200:
 *         description: The items was successfully find
 *         content:
 *          "application/json": {}
*/



/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [items]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Item title,
 *     responses:
 *       200:
 *         description: The item was successfully find
 *         content:
 *          "application/json": {}
 *       404:
 *         description: Not found
 */




/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Upload item by ID
 *     tags: [items]
 *     security:
 *       - Authorization: []
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Item title,
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateItem'
 *     responses:
 *       200:
 *         description: The item was successfully upload
 *         content:
 *          "application/json": {}
 *       404:
 *         description: Not found
 *       422:
 *         description:  Unprocessable Entity
 *       401:
 *         description:   Unauthorizedy
 */



/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete item by ID
 *     tags: [items]
 *     security:
 *       - Authorization: []
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Item title,
 *     responses:
 *       200:
 *         description: The item was successfully find
 *         content:
 *          "application/json": {}
 *       404:
 *         description: Not found
 *       401:
 *         description:   Unauthorizedy
 */





module.exports = router