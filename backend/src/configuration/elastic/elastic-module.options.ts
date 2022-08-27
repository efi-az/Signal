import { ClientOptions } from "@elastic/elasticsearch";

export const elasticModuleOptions:ClientOptions=
  {
    node:process.env.ELASTIC_NODE,
    auth:{
      username:process.env.ELASTIC_USERNAME,
      password:process.env.ELASTIC_PASSWORD
    }
  }