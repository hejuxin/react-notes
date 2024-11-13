import { addNote } from "@/lib/redis"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!file) {
    return NextResponse.json(
      { error: "File is required." },
      { status: 400 }
    )
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  // const relativeUploadDir = `/uploads/${dayjs().format("YY-MM-DD")}`
  // const uploadDir = path.join(process.cwd(), "public", relativeUploadDir)

  // try {
  //   await stat(uploadDir)
  // } catch (e) {
  //   if (e.code === "ENOENT") {
  //     await mkdir(uploadDir, { recursive: true });
  //   } else {
  //     console.error(e)
  //     return NextResponse.json(
  //       { error: "Something went wrong." },
  //       { status: 500 }
  //     );
  //   }
  // }

  try {
    // 写入文件
    // const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, "")
    // const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    // await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    // 调用接口，写入数据库
    const res = await addNote(JSON.stringify({
      title: filename,
      content: buffer.toString('utf-8'),
      updateTime: new Date()
    }))

    // 清除缓存
    revalidatePath('/', 'layout')

    return NextResponse.json({ uid: res });
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}