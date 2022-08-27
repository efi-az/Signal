import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CreditEntity } from "./entities/credit.entity";
import { CustomizedSignalEntity } from "./entities/custom-signal.entity";
import { CustomSignalRequestEntity } from "./entities/custom-signal-request.entity";
import { SignalEntity } from "./entities/signal.entity";
import { SignalImageEntity } from "./entities/signal-image.entity";
import { SignalService } from "./services/signal.service";
import { SignalController } from "./controllers/signal.controller";
import { UserEntity } from "../auth/entities/user.entity";
import { CurrencyEntity } from "./entities/currency.entity";
import { CreditService } from './services/credit.service';
import { CurrencyService } from './services/currency.service';
import { SignalImageService } from './services/signal-image.service';
import { CreditController } from './controllers/credit.controller';
import { CurrencyController } from './controllers/currency.controller';
import { SignalImageController } from './controllers/signal-image.controller';
import { MarketEntity } from './entities/market.entity';
import { CoinsEntity } from "./entities/coins.entity";
import { CryptoController } from "./controllers/crypto.controller";
import { CryptoService } from "./services/crypto.service";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigurations } from "../../configuration/multer/multer-config";

@Module({
  imports: [MulterModule.registerAsync({ useClass: MulterConfigurations }),
    TypeOrmModule.forFeature([CoinsEntity,CreditEntity, CustomizedSignalEntity, CustomSignalRequestEntity,
      SignalEntity, SignalImageEntity, UserEntity, CurrencyEntity, MarketEntity])],
  providers: [SignalService, CreditService, CurrencyService, SignalImageService,CryptoService],
  controllers: [SignalController, SignalImageController, CreditController, CurrencyController,CryptoController],
})
export class SignalModule {
}