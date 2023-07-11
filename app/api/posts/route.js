import Post from '@/models/post'
import { connectToDB } from '@/utils/connectToDB'
import {v2 as cloudinary} from 'cloudinary'
import { NextResponse } from 'next/server'

connectToDB();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

export const GET = async(req,res) => {
    try {
        const posts = await Post.find({})
        return new NextResponse.json({success:true,data:posts})
    } catch (error) {
        return new NextResponse.json({success:false,data:error.message})
    }
}

export const POST = async (req,res) => {
    try {
        const {name,prompt,photo} = await req.json()
        const photoUrl = await cloudinary.uploader.upload(photo)

        const newPost = await Post.create({name,prompt,photo:photoUrl.url})

        return NextResponse.json({success:true,data:newPost})
    } catch (error) {
        return new NextResponse.json({success:false,data:error.message})
    }
}
