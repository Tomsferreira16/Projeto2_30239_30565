admin user : "email": "admin@hinoportuna.pt", "password": "admin1"
      
guest user : "username": "guest",  "email": "guest@hinoportuna.pt"
     
comandos para correr:
npm install
npx prisma db push
npm run dev

inciar pgpadmin4 - adicionar base de dados "hinoportuna" - password = "123"
Para adicionar admin user tem de ser manualmente na tabela utilizador e meter o campo admin_priv = "true"