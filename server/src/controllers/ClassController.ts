import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinute from '../utils/convertHourToMinutes';

interface Schedule{
    week_day:Number;
    from:String;
    to:String;
}


class ClassController{

    async index(req:Request ,res:Response)
    {
        const filter = req.query;
        if(!filter.subject || !filter.week_day || !filter.time)
        {
            return res.json({error:"Missing filters to search classes"});
        } 
        const subject = filter.subject as string;
        const week_day = filter.week_day as string;
        const time = filter.time as string;
        const timeInMinutes = convertHourToMinute(time);
        

        const classes = await db("classes")
        .whereExists(function(){
            this.select("class_schedule.*").from("class_schedule")
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??',[Number(timeInMinutes)])
            .whereRaw('`class_schedule`.`to` > ??',[Number(timeInMinutes)]); 
        })
        .where("classes.subject","=",subject)
        .join("users", "classes.user_id","=","users.id")
        .select(["classes.*", "users.*"]);


        return res.json(classes);
    }

    async create(req:Request ,res:Response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;


        const trx  = await db.transaction();/* transaction */
        try
        {
            const insertedUsersIds = await trx("users").insert({
                name,
                avatar,
                whatsapp,
                bio
            });
            
            const user_id = insertedUsersIds[0];
            

            const insertedClassesIds = await trx("classes").insert({
                subject,
                cost,
                user_id
            });
            const class_id = insertedClassesIds[0];

            const classSchedule = schedule.map((scheduleItem:Schedule)=>{
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinute(scheduleItem.from),
                    to: convertHourToMinute(scheduleItem.to)
                };
            });
            await trx("class_schedule").insert(classSchedule);


            await trx.commit();

            return res.status(201).json();
        }
        catch(e)
        {
            
            await trx.rollback();
            return res.status(400).json({error:"Unexpected error while creating new class"});
        }
    }
}

export default ClassController;