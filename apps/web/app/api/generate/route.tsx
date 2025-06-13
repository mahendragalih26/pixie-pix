import { createUserContent, GoogleGenAI, Modality } from "@google/genai"
import { NextRequest, NextResponse } from "next/server"

// Function to convert base64 to a GenerativePart object
const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  }
}

export async function POST(req: NextRequest) {
  try {
    // We can't use req.json() here because we are sending FormData
    const formData = await req.formData()
    const prompt = formData.get("prompt") as string
    const image = formData.get("image") as File
    const key = process.env.NEXT_PUBLIC_GEMINI_KEY

    if (!prompt || !image) {
      return NextResponse.json(
        { error: "Prompt and image are required" },
        { status: 400 }
      )
    }

    // Upload Image method
    const buffer = Buffer.from(await image.arrayBuffer())
    const base64Image = buffer.toString("base64")

    const imagePart = fileToGenerativePart(base64Image, image.type)
    const ai = new GoogleGenAI({ apiKey: key })
    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [createUserContent([prompt, imagePart])],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    })
    // const text = response.text
    // let text = ""
    // // let imagePreview = ""
    // for await (const chunk of response) {
    //   console.log("full response = ", response)
    //   console.log("full response chunk = ", chunk)
    //   console.log("full response candidate = ", chunk?.candidates)
    //   console.log(
    //     "full response candidate 2 = ",
    //     chunk?.candidates?.[0]?.content
    //   )
    //   console.log(
    //     "full response candidate 3 = ",
    //     chunk?.candidates?.[0]?.content?.parts?.[0]?.inlineData
    //   )
    //   console.log("prompt = ", prompt)
    //   console.log(chunk.text)
    //   text += chunk.text
    //   //   imagePreview = chunk.candidates?.[0]?.content ?? ""
    // }

    let text = ""
    for (const part of response.candidates[0].content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        // console.log(part.text);
        text = part.text
      } else if (part.inlineData) {
        const imageData = part.inlineData.data
        const buffer = Buffer.from(imageData, "base64")
        fs.writeFileSync("gemini-native-image.png", buffer)
        console.log("Image saved as gemini-native-image.png")
      }
    }
    // [END text_gen_multimodal_one_image_prompt_streaming]
    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    )
  }
}
