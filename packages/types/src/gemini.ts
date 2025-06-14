// Define the shape of the data returned by the mutation
export interface GeminiResponse {
  text: string
}

export interface GeminiApiResponse {
  type: string
  data: any
}

// Define the shape of the error
export interface GeminiError {
  error: string
}

// Define the variables passed to the mutation function
export interface MutationVariables {
  prompt: string
  image: File
}
