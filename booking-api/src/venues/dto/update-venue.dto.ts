/**
 * Update Venue DTO
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateVenueDto } from './create-venue.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateVenueDto extends PartialType(CreateVenueDto) {
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
