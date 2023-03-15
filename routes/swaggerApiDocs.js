/**
 * @swagger
 *  /ping:
 *      get:
 *          security: []   # No security
 *          tags:
 *              - Server Status
 *          summary: Checks if the server is running
 *          description: The /ping endpoint helps us to check if the server is still running
 *          responses:
 *              200:
 *                  description: Server is up and running
 *              default:
 *                  description: Something is wrong
 */ 

/**
 * @swagger
 *   /auth/register:
 *      post:
 *          security: 
 *              - bearerAuth: [] 
 *          tags:
 *              - Security / Authentication  
 *          summary: Register a new user
 *          description: Registering a new user to the database.
 *          consumes:
 *              - application/json
 *          requestBody:
 *              description: Your `firstname` and `lastname` and  `email` and `password` are required 
 *                           as json raw document [links](https://www.stacksuit.com/).
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserPayload'
 *          responses:
 *              200:
 *                  description: successful registration.
*/




/**
 * @swagger
 *   /auth/login:
 *      post:
 *          security: 
 *              - bearerAuth: [] 
 *          tags:
 *              - Security / Authentication  
 *          summary: Login a user
 *          description: signing in a user from the database.
 *          consumes:
 *              - application/json:
 *          parameters:
 *            - in: formData
 *              type: string
 *              name: email
 *              description: The **email** is `required`
 *            - in: formData
 *              type: string
 *              name: password
 *              description: The `password` is **required**
 *          requestBody:
 *              description: Pass in your `email` and `password` as json raw document.
 *              content:
 *                  application/json:
 *                      schema:      # Request body contents
 *                          $ref: '#/components/schemas/Login'
 *          responses:
 *              200:
 *                  description: successfully logged in
 * 
*/


/**
 * @swagger
 *   /auth/logout:
 *      get:
 *          security: 
 *              - bearerAuth: [] 
 *          tags:
 *              - Security / Authentication 
 *          summary: Logout a user
 *          description:  Logout a user and expires the token
 *          responses:
 *              200:
 *                  description: User successfully logged out
 *          externalDocs:
 *                  description: Learn more about user operations.
 * 
*/


/**
 * @swagger
 *   /users:
 *      get: 
 *          security: 
 *              - bearerAuth: [] 
 *          tags:
 *              - Users
 *          summary: Get all users
 *          description: A list of all users.
 *              - application/json
 *          responses:
 *              200:
 *                  description: A list of users
*/


/**
 * @swagger
 *   /users/{id}:
 *      get: 
 *          security: 
 *              - bearerAuth: [] 
 *          tags:
 *              - Users
 *          summary: Get a user
 *          description:
 *              This resource represents an individual user in the system.
 *              Each user is identified by a numeric `id`.
 *          operationId: getUserById
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              type: string
 *              example:
 *                  "50debb23-2f4b-432a-8631-275050a4a2fb"
 *          responses:
 *              200:
 *                  description: User exist.
*/


/**
 * @swagger
 *   /users/{id}:
 *      patch: 
 *          security: 
 *              - bearerAuth: [] 
 *          tags:
 *              - Users
 *          summary: Update a user 
 *          description: Update a user .
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              type: string
 *              example:
 *                  "50debb23-2f4b-432a-8631-275050a4a2fb"
 *          requestBody:
 *              description: Update customer with properties to be changed
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserPayload'
 *                      example:   # Sample object 
 *                                  firstname: 'Smith'
 *                                  lastname: 'Will'
 *                                  age: 52
 *                                  gender: 'Male'
 *          responses:
 *              200:
 *                  description: User Update
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *              400:
 *                  description: Invalid request 
 *                  schema:
 *                      type: object
 *                  properties:   
 *                      message:
 *                          type: string
*/


/**
 * @swagger
 *   /users/{id}:
 *      delete: 
 *          security: 
 *              - bearerAuth: [] 
 *          tags:
 *              - Users
 *          summary: Delete a user
 *          description: Delete a user.
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              type: string
 *              example:
 *                  "50debb23-2f4b-432a-8631-275050a4a2fb"
 *          responses:
 *              200:
 *                  description: User Delete
 * 
*/



//This are the schemas/componets for swagger and the are called with $ref: '#/components/schemas/your_schema_name'

/**
 * @swagger
 * components:
 *  schemas:
 *      UserPayload:   #you schema name
 *          description: Register a user
 *          type: object
 *          required:
 *              - email
 *              - password
 *              - firstname
 *              - lastname
 *              - role
 *          properties:
 *              firstname:
 *                  type: string
 *              lastname:
 *                  type: string
 *              age:
 *                  type: integer
 *              email:
 *                  type: string
 *              gender:
 *                  type: string
 *              role:
 *                  type: string
 *                  enum: [instrcutor, Admin]
 *              password:
 *                  type: string
 */


/**
 * @swagger
 * components:
 *   schemas:
 *      Login:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *          example:   # Sample object 
 *                  email: johndoe@yahoo.com
 *                  password: password
 */
