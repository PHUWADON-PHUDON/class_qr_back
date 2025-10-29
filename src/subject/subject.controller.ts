import { Controller,Get,Post,Body,Param } from '@nestjs/common';
import { SubjectService } from './subject.service';

interface subjectType {
  subjectname:string;
  lavel:number;
}

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get("getallsubject")
  getallsubject() {
    return this.subjectService.getallsubject();
  }

  @Get("getonesubject/:id")
  getonesubject(@Param("id") id:string) {
    return this.subjectService.getonesubject(parseInt(id));
  }

  @Post("createsubject")
  createsubject(@Body() data:subjectType) {
    return this.subjectService.createsubject(data);
  }

  @Get("getstudentsubject/:lavelid")
  getstudentsubject(@Param("lavelid") lavelid:string) {
    return this.subjectService.getstudentsubject(parseInt(lavelid));
  }

  @Get("getdatecount/:subjectid")
  getdatecount(@Param("subjectid") subjectid:string) {
    return this.subjectService.getdatecount(parseInt(subjectid));
  }

  @Get("getcheckstatus")
  getcheckstatus() {
    return this.subjectService.getcheckstatus();
  }

  @Post("createhistory")
  createhistory(@Body() data:any) {
    return this.subjectService.createhistory(data);
  }

  @Get("gethistory/:lavelid/:subjectid")
  gethistory(@Param("lavelid") lavelid:string,@Param("subjectid") subjectid:string) {
    return this.subjectService.gethistory(parseInt(lavelid),parseInt(subjectid));
  }

  @Post("createnewstudenthistory")
  createnewstudenthistory(@Body() data:any) {
    return this.subjectService.createnewstudenthistory(data);
  }
}
