## Project Plan
- Set up
  - npm init
  - TypeScript set up (npm i -D typescript ts-node nodemon @types/node)
  - npx tsc --init
  - gitignore extension -->ctrl+shift+p then choose node
  - set up eslint for syntax error (download eslint extension) & npm init @eslint/config
  - setting up prettier
  - setting up express server (npm i -D @types/express)
  - installing dot env
  - creating config.ts & export config from file
  - MongoDb atlas ,database connection set up && Mongoose installation
  - Global error handlin using http-errors module

- User Routing
  - Work on Register 
    - req.body to work -json parser required ( app.use(express.json()))
    - step1 :Validation
      - detail not provided 
      - user already exists
    - step2:processing
      - hashing password (bcrypt)
      - creating user and storing user
      - generating JWT token
    - step3:Responding JWT token
  
  - Work on Login
    - email or password not provided
    - search email in database
      - not found --> error
      - found --> compare password--> match create and return JWT Token

- Book Routing
  - settinng the book route creating schema
  - multer installation for file related work and creating middleware
  - 

      