
import { Ad, PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';
import cors from 'cors';
import adsCreateValidation from './validations/ads/ads-create-validation';
import { zParse } from './utils/zod-generic-validation';
import { validate } from './middleware/validate';

import express, { Request, Response, NextFunction } from "express";
import { z, AnyZodObject, ZodError } from "zod";
import { AdCreateSchema } from './schemas/ads/ad-create-schema';
import { AdListSchema } from './schemas/ads/ad-list-schema';

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
}))

app.listen(3333);

const prisma = new PrismaClient({
    // log: ['query', 'info']
});


app.all("*", (req, res, next) => {
    console.log(`${req.method} -> ${req.url}`);
    next();
});

app.get('/ads', async (request, response) => {
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })


    return response.json(ads.map(ad => {
        return {
            ...ad,
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
            weekDays: ad.weekDays.split(','),

        }
    }));
});

app.get('/ads/:id/discord', async (request, response) => {

    const adsId = request.params.id;

    const ads = await prisma.ad.findUniqueOrThrow({
        select: {
            id: true,
            discord: true,
        },
        where: {
            id: adsId,
        },
    })

    return response.json(ads);
});

app.get('/games/', async (request, response) => {

    const games = await prisma.game.findMany({
        include: {
            ads: true,
            _count: true,
        }
    });

    return response.json(games);
});

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
            createdAt: true
        },
        where: {
            gameId: gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
            weekDays: ad.weekDays.split(','),

        }
    }));
});

app.post('/games/:id/ads', validate(AdCreateSchema), async (req, res) => {

    // type NewAd = z.infer<typeof SchemaAd>;
    // const body: NewAd['body'] = req.body;

    const gameId = req.params.id;
    const body = req.body;

    const ad = await prisma.ad.create({
        data: {
            ...body,
            gameId,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
        },
        select: AdListSchema
    })

    return res.json(ad);
});