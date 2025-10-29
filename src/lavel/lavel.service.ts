import { Injectable,BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface lavelType {
  lavel:number;
  sublavel:number;
}

interface studentType {
  lavelid:string
  studentid:string;
  name:string;
  lastname:string;
}

@Injectable()
export class LavelService {
    constructor(private prisma: PrismaService) {}

    async getclassroom() {
        try{
            const getall = await this.prisma.lavel.findMany();

            return(getall);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async getoneclassroom(id:number) {
        try{
            const findlavel = await this.prisma.lavel.findUnique({where:{id:id}});

            if (findlavel) {
                return(findlavel);
            }
            else {
                return;
            }
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createclassroom(data:lavelType) {
        try{
            const findclassroom = await this.prisma.lavel.findFirst({where:{lavel:data.lavel,sublavel:data.sublavel}});
            
            if (findclassroom) {
                return({hadata:true});
            }
            else {
                const createclassroom = await this.prisma.lavel.create({data:{
                    lavel:data.lavel,
                    sublavel:data.sublavel
                }});

                return({hadata:false,data:createclassroom});
            }
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async getallstudent(id:number) {
        try{
            const findall = await this.prisma.studentlavel.findMany({where:{lavel_id:id},include:{lavel:true}});

            return(findall);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async getonestudent(id:number) {
        try{
            const findone = await this.prisma.studentlavel.findUnique({where:{id:id}});

            return(findone);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createstudent(data:studentType) {
        try{
            const findstudent = await this.prisma.studentlavel.findFirst({where:{studentid:data.studentid}});
            if (findstudent) {
                return({hasdata:true});
            }
            else {
                const createstudent = await this.prisma.studentlavel.create({data:{
                    lavel_id:parseInt(data.lavelid),
                    studentid:data.studentid,
                    name:data.name,
                    lastname:data.lastname
                },include:{lavel:true}});

                return({hasdata:false,data:createstudent});
            }
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async updatestudent(id:number,data:studentType) {
        try{
            const updatestudent = await this.prisma.studentlavel.update({where:{id:id},data:{
                studentid:data.studentid,
                name:data.name,
                lastname:data.lastname
            }});

            return(updatestudent);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async deletestudent(id:number) {
        try{
            return await this.prisma.studentlavel.delete({where:{id:id}});
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }
}
