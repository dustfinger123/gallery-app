const user = process.env.NEXT_PUBLIC_mongo_user
const password = process.env.NEXT_PUBLIC_mongo_password

export const connectionStr = `mongodb+srv://${user}:${password}@cluster0.a9uhwmz.mongodb.net/gallery?retryWrites=true&w=majority`;

