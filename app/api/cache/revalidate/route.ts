import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Config } from "@/config";

export const POST = async (req: NextRequest, res: NextResponse) => {
    if (typeof req.headers !== "object") {
        return NextResponse.json({result: 'Invalid Request'}, { status: 401 });
    }
    const authorization = req.headers.get('Authorization');

    const tokenData = typeof authorization === "string" ? authorization.split(" ") : [];
    if (tokenData.length === 0) {
        return NextResponse.json({result: 'Invalid Request'}, { status: 401 });
    }
    if (tokenData.length === 2 && tokenData[0] === "Basic" && tokenData[1] !== Config.cache.token) {
        return NextResponse.json({result: 'Invalid Request'}, { status: 401 });
    }

    const url = "url" in req && typeof req.url === "string" ? new URL(req.url) : null;
    if (url === null) {
        return NextResponse.json({error: 'Internal Server Error'}, { status: 500 });
    }

    let body = {};
    try {
        body = await req.json();
    }
    catch(e) {
        return NextResponse.json({error: 'Internal Server Error'}, { status: 500 });
    }

    if (req.method === "POST" && typeof body === "object") {
        if ('tags' in body && Array.isArray(body.tags)) {
            let responseTags: string[] = [];
            body.tags.map((tag) => {
                responseTags.push(tag);
                revalidateTag(tag);
            });

            if (responseTags.length > 0) {
                return NextResponse.json({message: `Cache cleared for tag: ${responseTags.join(", ")}`}, { status: 200 });
            }
        }
        else {
            return NextResponse.json({error: 'Method not allowed'}, { status: 405 });
        }
    }
    else {
        return NextResponse.json({error: 'Method not allowed'}, { status: 405 });
    }
}