import { Controller,Get,Post,Body,Param,Patch,Delete } from '@nestjs/common';
import { LavelService } from './lavel.service';

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

@Controller('lavel')
export class LavelController {
  constructor(private readonly lavelService: LavelService) {}

  @Get()
  getclassroom() {
    return this.lavelService.getclassroom();
  }

  @Get("getlavel/:id")
  getoneclassroom(@Param("id") id:string) {
    return this.lavelService.getoneclassroom(parseInt(id));
  }

  @Post("createclassroom")
  createclassroom(@Body() data:lavelType) {
    return this.lavelService.createclassroom(data);
  }

  @Get("getallstudent/:id")
  getallstudent(@Param("id") id:string) {
    return this.lavelService.getallstudent(parseInt(id));
  }

  @Get("getonestudent/:id")
  getonestudent(@Param("id") id:string) {
    return this.lavelService.getonestudent(parseInt(id));
  }

  @Post("createstudent")
  createstudent(@Body() data:studentType) {
    return this.lavelService.createstudent(data);
  }

  @Patch("updatestudent/:id")
  updatestudent(@Param("id") id:string,@Body() data:studentType) {
    return this.lavelService.updatestudent(parseInt(id),data);
  }

  @Delete("deletestudent/:id")
  deletestudent(@Param("id") id:string) {
    return this.lavelService.deletestudent(parseInt(id));
  }
}
