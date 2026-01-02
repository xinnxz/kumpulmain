/**
 * Venues Controller - KumpulMain.id
 * 
 * Public endpoints untuk browsing venues.
 * CRUD operations handled by PengelolaController.
 */

import {
    Controller,
    Get,
    Param,
    Query,
    ParseUUIDPipe,
} from '@nestjs/common';
import { VenuesService } from './venues.service';

@Controller('venues')
export class VenuesController {
    constructor(private venuesService: VenuesService) { }

    /**
     * Get all active venues with filtering
     */
    @Get()
    async findAll(
        @Query('skip') skip?: string,
        @Query('take') take?: string,
        @Query('search') search?: string,
        @Query('city') city?: string,
        @Query('venueType') venueType?: string,
        @Query('minPrice') minPrice?: string,
        @Query('maxPrice') maxPrice?: string,
        @Query('minCapacity') minCapacity?: string,
    ) {
        return this.venuesService.findAll({
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
            search,
            city,
            venueType,
            minPrice: minPrice ? parseInt(minPrice) : undefined,
            maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
            minCapacity: minCapacity ? parseInt(minCapacity) : undefined,
        });
    }

    /**
     * Get filter options
     */
    @Get('filters/cities')
    async getCities() {
        return this.venuesService.getCities();
    }

    @Get('filters/types')
    async getVenueTypes() {
        return this.venuesService.getVenueTypes();
    }

    /**
     * Get venue by ID or slug
     */
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.venuesService.findOne(id);
    }

    /**
     * Get venue with availability for specific date
     */
    @Get(':id/availability')
    async findWithAvailability(
        @Param('id', ParseUUIDPipe) id: string,
        @Query('date') date: string,
    ) {
        const dateObj = date ? new Date(date) : new Date();
        return this.venuesService.findOneWithAvailability(id, dateObj);
    }
}
