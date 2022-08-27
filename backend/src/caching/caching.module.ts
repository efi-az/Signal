import { Module,CacheModule } from '@nestjs/common';
import { CacheConfig } from "./cache.config";
import { CachingService } from "./caching.service";

@Module({
  imports:[CacheModule.registerAsync({useClass:CacheConfig})],
  providers:[CachingService],
  exports:[CachingService]
})
export class CachingModule {}
