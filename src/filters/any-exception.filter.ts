/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 16:45:13
 * @LastEditTime: 2023-07-04 21:58:44
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\filters\any-exception.filter.ts
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AnyExceptionFilter<T> implements ExceptionFilter {
  // 注入日志服务相关依赖
  constructor(
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    // const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // this.logger.error('exception', {
    //   status,
    //   req: getReqMainInfo(request),
    // });
    // this.loggingService.error('AnyExceptionFilter', getReqMainInfo(request));
    response.status(status).send({
      code: status,
      data: null,
      success: false,
      message: `Service Error: ${exception}`,
    });
  }
}
