import { Controller,Get,Param,Res,StreamableFile  } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express'

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get("getreport/:subjectid")
  async getReport(@Param("subjectid") subjectId:string, @Res() res: any,) {
    const getReport = await this.reportService.getReport(subjectId);

    res.status(200)
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="attendance.xlsx"',
    )

    res.send(getReport)
  }
}
 