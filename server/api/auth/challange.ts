import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
      });
  
      await session.update({
        challange: uuidv4(),
      });
  
      return session.data;
})