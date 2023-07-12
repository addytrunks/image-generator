import openai from "@/utils/openai"
import { NextResponse } from "next/server"

export const POST = async (res,req) => {
    try {
        const {prompt} = await res.json()
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json'
        })

        const image = aiResponse.data.data[0].b64_json

        return NextResponse.json({photo:image})
    } catch (error) {
        console.log(error.message)
    }
}