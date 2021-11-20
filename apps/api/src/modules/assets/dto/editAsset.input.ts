import { InputType, Field, OmitType } from '@nestjs/graphql';

import { Asset } from '@wellness/core';

@InputType()
export class AssetEditInput extends OmitType(Asset, ['boot'] as const) {}
