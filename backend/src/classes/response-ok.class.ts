export class Response200 {
  status : number = 200 ;
  result : Object|any;
  timestamps : number=Date.now();
}
export class ResponseOk {
  static getData(obj : Object) : Response200 {
    return {
      status: 200,
      result: obj,
      timestamps: Date.now()
    }
  }
}