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
            const result = Object.entries(grouped).map(([date, records]) => {
                const checkamount = records.filter((r) => r.checkstatusid === 1 || r.checkstatusid === 3).length;

                return { date, records, checkamount };
            });

            return(result);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createnewstudenthistory(data:any) {
        try{
            if (data.data.length > 0) {
                const findStudentId = await this.prisma.studentcheck.findMany({where:{studentid:data.data[0].studentid}});
                if (findStudentId.length <= 0) {
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
            }

            return;
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async updatehistory(id:number,checkid:number) {
        try{
            const update = await this.prisma.studentcheck.update({where:{id:id},data:{checkstatusid:checkid}});

            return;
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async deletesubject(id:number) {
        try{
            await this.prisma.studentcheck.deleteMany({where:{subjectid:id}});
            await this.prisma.datecount.deleteMany({where:{subjectid:id}});
            
            return await this.prisma.subject.delete({where:{id:id}});
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async getforexcel(id:number) {
        try{
            const finddata = await this.prisma.studentcheck.findMany({
                where:{
                    subjectid:id
                },
                include:{
                    lavel:true,
                    subject:true,
                    datecount:true,
                    studentlavel:true,
                    checkstatus:true
                }
            });

            const grouped = _.groupBy(finddata, (item) => item.studentlavel.id);

            return(grouped)
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }
}
