import { registerAs } from "@nestjs/config";

export default registerAs("postgres",()=>({
  host:process.env.DATABASE_HOST,
  port:process.env.DATABASE_PORT,
  database:process.env.DATABASE_NAME,
  username:process.env.DATABASE_USERNAME,
  password:process.env.DATABASE_PASSWORD,
  autoLoadEntities:true,
  synchronize:true
}))