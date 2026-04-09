import { createClient } from "redis";

class CacheService {
  constructor() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
      },
    });

    this.client.on("error", (error) => {
      console.error(error);
    });

    this.client.connect();
  }

  async set(key, value, expirationInSecond = 3600) {
    await this.client.set(key, value, {
      EX: expirationInSecond,
    });
  }

  async get(key) {
    const result = await this.client.get(key);
    if (result === null) throw new Error("Cache tidak ditemukan");
    return result;
  }

  delete(key) {
    return this.client.del(key);
  }
}

export default CacheService;
