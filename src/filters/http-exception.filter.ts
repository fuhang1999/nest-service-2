/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-26 23:04:51
 * @LastEditTime: 2023-07-04 21:59:01
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\filters\http-exception.filter.ts
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 注入日志服务相关依赖
  constructor(
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
      
    response.status(status).send({
      code: status,
      data: null,
      success: false,
      message: message,
    });

    // const ctx = host.switchToHttp();
    // const res = ctx.getResponse<Response>();
    // const req = ctx.getRequest<Request>();
    // const status =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;

    // const response: any = exception.getResponse();
    // const { error, message } = response;

    // let msg =
    //   exception.message || (status >= 500 ? 'Service Error' : 'Client Error');
    // if (
    //   Object.prototype.toString.call(response) === '[object Object]' &&
    //   response.message
    // ) {
    //   msg = response.message;
    // }

    // // 记录日志（错误消息，错误码，请求信息等）
    // this.logger.error(msg, {
    //   status,
    //   req: getReqMainInfo(req),
    // stack: exception.stack,
    // });

    // res.status(status).json({
    //   status,
    //   success: false,
    //   timestamp: new Date().toISOString(),
    //   path: req.url,
    //   error,
    //   message: msg || message || exception.getResponse(),
    // });
  }
}
