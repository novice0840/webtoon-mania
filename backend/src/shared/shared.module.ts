import { ApiConfigService } from './services/api-config.service';
import { Global, Module, type Provider } from '@nestjs/common';

const providers: Provider[] = [ApiConfigService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
