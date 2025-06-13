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
    console.log("prompt, image", prompt, image)

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

    let textOutput = ""
    let imageBuffer: Buffer | undefined
    let imageMimeType: string = "image/png" // Default to PNG, or extract dynamically if possible

    for await (const chunk of response) {
      const responsePart = chunk?.candidates?.[0]?.content?.parts
      if (responsePart) {
        for (const part of responsePart) {
          // Based on the part type, either show the text or save the image
          if (part.text) {
            // console.log(part.text);
            textOutput = part.text
          } else if (part.inlineData) {
            const imageData = part?.inlineData?.data
            if (imageData) {
              imageBuffer = Buffer.from(imageData, "base64")
              // If you need to be precise with the mime type from the model's response:
              // imageMimeType = part.inlineData.mimeType || "image/png";
            }
          }
        }
      }
    }
    // [END text_gen_multimodal_one_image_prompt_streaming]
    // return NextResponse.json({ text, imageBuffer })
    // Determine what to return
    if (imageBuffer) {
      // If an image was generated, return it directly
      return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
          "Content-Type": imageMimeType,
          "Content-Disposition":
            'inline; filename="gemini-generated-image.png"', // Use 'inline' to display in browser, 'attachment' to download
        },
      })
    } else {
      // If no image was generated, but there's text, return JSON with text
      return NextResponse.json(
        { text: textOutput || "No image generated and no text output." },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    )
  }
}
