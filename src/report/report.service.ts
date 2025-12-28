import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import _ from 'lodash';
import * as ExcelJS from 'exceljs'

@Injectable()
export class ReportService {
    constructor(private prisma: PrismaService) {}

    async getReport(subjectId:string) {
        try{
            const getData = await this.prisma.studentcheck.findMany({
                where:{
                    subjectid:+subjectId
                },
                include:{
                    studentlavel:true,
                    checkstatus: true,
                    datecount: true,
                },
                orderBy:{
                    studentid:"asc"
                }
            });
            const grouped = _.groupBy(getData, 'studentid');
            const groupedResult = Object.values(grouped).map(items => items);
            const mapData = groupedResult.map((item,i) => {
                return {
                    index: i + 1,
                    studentId: item.map((initem) => initem.studentlavel.studentid),
                    firstName: item[0].studentlavel.name,
                    lastName: item[0].studentlavel.lastname,
                    status: item.map((initem) => initem.checkstatus.statusname),
                    date: item.map((initem) => initem.datecount.date)
                };
            })

            const workbook = new ExcelJS.Workbook()
            const worksheet = workbook.addWorksheet('Attendance')

            const allDates = Array.from(
                new Set(mapData.flatMap(d => d.date))
            ).sort()

            worksheet.columns = [
                { header: 'ลำดับ', key: 'index', width: 8 },
                { header: 'รหัสนักเรียน', key: 'studentId', width: 15 },
                { header: 'ชื่อ', key: 'firstName', width: 20 },
                { header: 'สกุล', key: 'lastName', width: 20 },
                ...allDates.map(date => ({
                    header: date,
                    key: date,
                    width: 20
                })),
            ]

            mapData.forEach(student => {
                const row: any = {
                    index: student.index,
                    studentId: student.studentId[0],
                    firstName: student.firstName,
                    lastName: student.lastName,
                }

                allDates.forEach(date => {
                    const idx = student.date.indexOf(date)
                    row[date] = idx !== -1 ? student.status[idx] : '-'
                })

                worksheet.addRow(row)
            });

            const buffer = await workbook.xlsx.writeBuffer()

            return(buffer);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }
}
