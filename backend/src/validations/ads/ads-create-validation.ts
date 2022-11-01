import { Ad } from "@prisma/client";
import { z, ZodError } from "zod";

export default function adsCreateValidation(body: any) {
    const validated = z.object({
        name: z.string().min(1),
        yearsPlaying: z.number().max(100),
        discord: z.union([z.string().max(2), z.undefined()]),
        weekDays: z.string(),
        hourStart: z.string().min(5),
        hourEnd: z.string().min(5),
        useVoiceChannel: z.boolean(),
    }).strict();

    return validated.parse(body);
}