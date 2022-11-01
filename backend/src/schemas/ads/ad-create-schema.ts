import { z } from "zod";

export const AdCreateSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        yearsPlaying: z.number().max(100),
        // discord: z.union([z.string().max(2), z.undefined()]),
        discord: z.string().min(1),
        weekDays: z.array(z.number()),
        hourStart: z.string().min(5),
        hourEnd: z.string().min(5),
        useVoiceChannel: z.boolean(),
    }).strict(),
    params: z.object({
        id: z.string()
    }).strict()
})