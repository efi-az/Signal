import { registerAs } from "@nestjs/config";

export default registerAs('throttler', () => ({
  ttl:process.env.RATE_LIMITER_TTL,
  limit:process.env.RATE_LIMITER_LIMIT
}));