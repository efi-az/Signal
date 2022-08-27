import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response200, ResponseOk } from "../classes/response-ok.class";

export function ResponseOkSerialize()
{
  return UseInterceptors(ResponseOkInterceptor)
}

export class ResponseOkInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Response200> | Promise<Observable<Response200>> {
    return next.handle().pipe(map(data=>(ResponseOk.getData(data))))
  }

}