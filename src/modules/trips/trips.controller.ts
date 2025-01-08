import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFiles, Patch, Query } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './schemas/trip.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { s3Client } from '../../config/aws.config';
import * as AWS from '@aws-sdk/client-s3';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {
    console.log('TripsController initialized');
  }

  @Get()
  async findAll() {
    console.log('GET /trips endpoint hit');
    try {
      const trips = await this.tripsService.findAll();
      console.log('Successfully retrieved trips:', trips);
      return trips;
    } catch (error) {
      console.error('Error in findAll controller:', error);
      throw error;
    }
  }


  /**
   * 사용자 ID를 기준으로 여행 기록 가져오기
   * @param userId 구글 사용자 ID
   */
  @Get()
  async getTripsByUser(@Query('userId') userId: string): Promise<Trip[]> {
    if (!userId) {
      throw new Error('userId is required');
    }
    return this.tripsService.findByUser(userId);
  }


  @Get('test')
  test() {
    console.log('Test endpoint hit');
    return { message: 'Trips endpoint is working' };
  }

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    console.log('Received trip data:', createTripDto);
    return this.tripsService.create(createTripDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Trip> {
    return this.tripsService.findOne(id);
  }

  @Patch(':tripId/add-member')
  async addMember(@Param('tripId') tripId: string, @Body() body: { googleEmail: string }) {
    const { googleEmail } = body;
    return this.tripsService.addMember(tripId, googleEmail);
  }
}