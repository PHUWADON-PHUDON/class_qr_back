import { Injectable,BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import _ from 'lodash';

interface subjectType {
  subjectname:string;
  lavel:number;
}

@Injectable()
export class SubjectService {
    constructor(private prisma: PrismaService) {}

    async getallsubject() {
        try{
            const findallsubject = await this.prisma.subject.findMany({include:{lavel:true}});

            return(findallsubject);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async getonesubject(id:number) {
        try{
            const getsubject = await this.prisma.subject.findUnique({where:{id:id},include:{lavel:true}});

            return(getsubject);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createsubject(data:subjectType) {
        try{
            const findsubjectname = await this.prisma.subject.findFirst({where:{subjectname:data.subjectname}});
            const findlavel = await this.prisma.subject.findFirst({where:{lavel_id:data.lavel}});

            if (findsubjectname && findlavel) {
                return({hasdata:true});
            }
            else {
                const createsubject = await this.prisma.subject.create({data:{
                    lavel_id:data.lavel,
                    subjectname:data.subjectname
                },include:{lavel:true}});

                return({hasdata:false,data:createsubject});
            }
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async getstudentsubject(lavelid:number) {
        try{
            const findstudent = await this.prisma.studentlavel.findMany({where:{lavel_id:lavelid},orderBy:{id:"asc"}});

            return(findstudent);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async getdatecount(subjectid:number) {
        try{
            const findtimecount = await this.prisma.datecount.findMany({where:{subjectid:subjectid}});

            return(findtimecount);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async getcheckstatus() {
        try{
            const findcheckstatus = await this.prisma.checkstatus.findMany();

            return(findcheckstatus);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createhistory(data:any) {
        try{
            const createdatecount = await this.prisma.datecount.create({data:{
                subjectid:parseInt(data.subjectid),
                date:data.date
            }});

            const cleandata = data.data.map((e:any) => {
                return({lavel_id:e.lavelid,subjectid:parseInt(data.subjectid),datecountid:createdatecount.id,studentid:e.studentid,checkstatusid:e.checkid});
            });

            const createhistory = await Promise.all(cleandata.map(async (e:any) => {
                return await this.prisma.studentcheck.create({data:{
                    lavel_id:e.lavel_id,
                    subjectid:e.subjectid,
                    datecountid:e.datecountid,
                    studentid:e.studentid,
                    checkstatusid:e.checkstatusid
                }});
            }));

            return;
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async gethistory(lavelid:number,subjectid:number) {
        try{
            const gethistory = await this.prisma.studentcheck.findMany({
                    where:{
                        lavel_id:lavelid,
                        subjectid:subjectid
                    },
                    include:{
                        datecount:true
                    },
                    orderBy:[
                        {datecountid:"asc"},
                        {studentid:"asc"}
                    ]
                }
            );
        
            const grouped = _.groupBy(gethistory, (item) => item.datecount.date);
                    
            const result = Object.entries(grouped).map(([date, records]) => ({
              date,
              records,
            }));

            return(result);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createnewstudenthistory(data:any) {
        try{
            if (data.data.length > 0) {
                const createhistory = await Promise.all(data.data.map(async (e:any) => {
                    return await this.prisma.studentcheck.create({data:{
                        lavel_id:e.lavelid,
                        subjectid:e.subjectid,
                        datecountid:e.datecountid,
                        studentid:e.studentid,
                        checkstatusid:e.checkid
                    }});
                }));
            }

            return;
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }
}
