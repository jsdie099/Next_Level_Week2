import { Request, Response } from 'express';
import db from '../database/connection';


class UserController{
    async index(req:Request ,res:Response) {
        try
        {
            const { name, avatar, whatsapp, bio} = req.body;
            const users = await db("users").select("*");
            return res.json(users);
        }
        catch(e)
        {
            return res.send(e);
        }
    }
    async create(req:Request ,res:Response) {
        try
        {
            const { name, avatar, whatsapp, bio} = req.body;
            await db("users").insert({
                name,
                avatar,
                whatsapp,
                bio
            });
            return res.json(name);
        }
        catch(e)
        {
            return res.send(e);
        }
    }
    async index2(req:Request ,res:Response) {
        try
        {
            const { name, avatar, whatsapp, bio} = req.body;
            const users = await db("class_schedule").select("*");
            return res.json(users);
        }
        catch(e)
        {
            return res.send(e);
        }
    }
    
}

export default UserController;