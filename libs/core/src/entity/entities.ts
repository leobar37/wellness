import { Activity } from './activity/activity.entity';
import { Administrator } from './administrator/administrator.entity';
import { Asistence } from './asistence/asistence.entity';
import { Asset } from './asset/asset.entity';
import { AssetBoot } from './asset/relation-asset.entity';
import { Client } from './client/client.entity';
import { Contract } from './contract/contract.entity';
import { DetailFicha } from './ficha/Detail-ficha.entity';
import { Ficha } from './ficha/ficha.entity';
import { Plan } from './plan/plan.entity';
import { Suscription } from './suscription/suscription.entity';
import { User } from './user/user.entity';
import { ContractView } from './contract/Contract.view';
export const coreEntitiesMap = {
  Activity,
  Administrator,
  Asistence,
  Asset,
  AssetBoot,
  Client,
  Contract,
  DetailFicha,
  Ficha,
  Plan,
  Suscription,
  User,
  ContractView,
};
