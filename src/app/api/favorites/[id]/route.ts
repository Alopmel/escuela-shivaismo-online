import { deleteFavorites, getVideoByID, updateFavorites } from "@/lib/favoriteData";
import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const videoId = req.url.split("favorites/")[1];
//     console.log(videoId)
//     const favorite = await getVideoByID(videoId);
//     if (!favorite) {
//       return NextResponse.json({ message: "Error" }, { status: 404 });
//     }
//     return NextResponse.json({ message: "OK", favorite }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: "Error", err }, { status: 500 });
//   }
// }

// export async function PUT(req: Request) {
//   try {
//     const videoId = req.url.split("favorites/")[1];
//     const favorite = await getVideoByID(videoId);
//     await updateFavorites(videoId, new Date());
//     return NextResponse.json({ message: "OK", favorite }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: "Error", err }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//     try {
//       const videoId = req.url.split("favorites/")[1];
//       if (!videoId) {
//         return NextResponse.json({ message: "videoId is required" }, { status: 400 });
//       }
//       const favorite = await getVideoByID(videoId);
//       if (!favorite) {
//         return NextResponse.json({ message: "Favorite not found" }, { status: 404 });
//       }
//       await deleteFavorites(videoId);
//       return NextResponse.json({ message: "OK", favorite }, { status: 200 });
//     } catch (err) {
//       return NextResponse.json({ message: "Error", err }, { status: 500 });
//     }
//   }